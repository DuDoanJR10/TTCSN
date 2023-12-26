import React, { useEffect } from 'react';
import { Space, Table, Button, Popconfirm } from 'antd';
import TextDisplay from '../../../components/TextDisplay';
import ModalAdd from '../components/ModalAdd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setListStaff,
  setLoading,
  setModalAdd,
  setModalUpdate,
} from '../store/staffSlice';
import { deleteStaff, getListStaff } from '../api';
import showMessage from '../../../hooks/message-hooks';
import ModalUpdate from '../components/ModalUpdate';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';

const Staff = () => {
  const dispatch = useDispatch();
  let listStaff = useSelector((state) => state.staff?.listStaff);
  const loading = useSelector((state) => state.staff?.loading);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleCreate = () => {
    dispatch(setModalAdd({ open: true }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getListStaff(user?.accessToken, axiosJWT).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListStaff(res.data?.listStaff));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    deleteStaff(id, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListStaff(res.data?.listStaff));
        showMessage().showSuccess(res.data?.message);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };

  const handleEdit = (record) => {
    dispatch(
      setModalUpdate({
        open: true,
        id: record?._id,
        room: record?.idRoom,
        phone: record?.phone,
        name: record?.name,
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
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Phòng ban',
      key: 'room',
      dataIndex: 'room',
      render: (text) => <TextDisplay text={text} />,
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
  if (listStaff) {
    listStaff = listStaff.map((staff, index) => {
      return {
        ...staff,
        key: index + 1,
        room: staff?.room?.name,
        idRoom: staff?.room?._id,
      };
    });
  }
  return (
    <div className="Staff">
      <div className="container">
        <h1 className="heading box-shadow">Nhân viên</h1>
        <Button
          type="primary"
          className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
          onClick={handleCreate}
        >
          Tạo
        </Button>
        <div className="Staff__table">
          <Table
            pagination={{ position: ['bottomCenter'] }}
            loading={loading}
            columns={columns}
            dataSource={listStaff}
          />
        </div>
        <ModalAdd />
        <ModalUpdate />
      </div>
    </div>
  );
};

export default Staff;
