import { Space, Table, Button, Popconfirm } from 'antd';
import TextDisplay from '../../../components/TextDisplay';
import { useEffect } from 'react';
import { deleteCategory, getListCategories } from '../api';
import { useDispatch } from 'react-redux';
import {
  setListCategories,
  setLoading,
  setModalAdd,
  setModalUpdate,
} from '../store/categorySlice';
import showMessage from '../../../hooks/message-hooks';
import { useSelector } from 'react-redux';
import ModalUpdate from '../components/ModalUpdate';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import ModalAdd from '../components/ModalAdd';

const Category = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category?.loading);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let listCategories = useSelector((state) => state.category?.listCategories);

  useEffect(() => {
    dispatch(setLoading(true));
    getListCategories().then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListCategories(res.data?.Categories));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    deleteCategory(id, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListCategories(res.data?.Categories));
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
        name: record?.name,
        description: record?.description,
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
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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

  const handleCreate = () => {
    dispatch(setModalAdd({ open: true }));
  };
  if (listCategories) {
    listCategories = listCategories.map((category, index) => {
      return {
        ...category,
        key: index + 1,
      };
    });
  }

  return (
    <div className="Category">
      <div className="container">
        <h1 className="heading box-shadow">Danh mục</h1>
        <Button
          type="primary"
          className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
          onClick={handleCreate}
        >
          Tạo
        </Button>
        <div className="Category__table">
          <Table
            pagination={{ position: ['bottomCenter'] }}
            loading={loading}
            columns={columns}
            dataSource={listCategories}
          />
        </div>
        <ModalUpdate />
        <ModalAdd />
      </div>
    </div>
  );
};

export default Category;
