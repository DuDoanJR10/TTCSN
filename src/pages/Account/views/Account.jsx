import React, { useEffect } from 'react';
import { Space, Table, Button, Tag, Popconfirm } from 'antd';
import TextDisplay from '../../../components/TextDisplay';
import { deleteAccount, getListAccount } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setListAccounts,
  setLoading,
  setModalAdd,
  setModalUpdate,
} from '../store/accountSlice';
import showMessage from '../../../hooks/message-hooks';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import ModalAdd from '../components/ModalAdd';
import ModalUpdate from '../../Account/components/ModalUpdate';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let listAccounts = useSelector((state) => state.account?.listAccounts);
  if (listAccounts) {
    listAccounts = listAccounts.map((account, index) => {
      return {
        ...account,
        key: index + 1,
      };
    });
  }
  useEffect(() => {
    dispatch(setLoading(true));
    getListAccount(user.accessToken, axiosJWT).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListAccounts(res.data?.Accounts));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
      if (res.data?.toHome) {
        navigate('/');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    dispatch(setModalAdd({ open: true }));
  };

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    deleteAccount(id, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListAccounts(res.data?.Accounts));
        showMessage().showSuccess(res.data?.message);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
      if (res.data?.toHome) {
        navigate('/');
      }
    });
  };
  const handleEdit = (record) => {
    dispatch(
      setModalUpdate({
        open: true,
        id: record?._id,
        username: record?.username,
        password: record.password,
        phone: record?.phone,
        address: record?.address,
        role: record?.role,
      }),
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'Mã tài khoản',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Vai trò',
      key: 'role',
      dataIndex: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'green' : 'geekblue'}>
          {role === 'admin' ? 'Người quản trị' : 'Người dùng'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="Account">
      <div className="container">
        <h1 className="heading box-shadow">Tài khoản</h1>
        <Button
          type="primary"
          className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
          onClick={handleCreate}
        >
          Tạo
        </Button>
        <div className="Account__table w-full">
          <Table
            pagination={{ position: ['bottomCenter'] }}
            className="w-full"
            columns={columns}
            dataSource={listAccounts}
          />
        </div>
        <ModalAdd />
        <ModalUpdate />
      </div>
    </div>
  );
};

export default Account;
