import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Popconfirm } from 'antd';
import TextDisplay from '../../../components/TextDisplay';
import ModalAdd from '../components/ModalAdd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setListSupplies,
  setLoading,
  setModalAdd,
  setModalUpdate,
} from '../store/suppliesSlice';
import { deleteSupplies, getListSupplies } from '../api';
import showMessage from '../../../hooks/message-hooks';
import ModalUpdate from '../components/ModalUpdate';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import ModalExport from '../components/ModalExport';
import ModalImport from '../components/ModalImport';

const Supplies = () => {
  const dispatch = useDispatch();
  const [openExport, setOpenExport] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  let listSupplies = useSelector((state) => state.supplies?.listSupplies);
  const loading = useSelector((state) => state.supplies?.loading);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleCreate = () => {
    dispatch(setModalAdd({ open: true }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getListSupplies().then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListSupplies(res.data?.listSupplies));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    deleteSupplies(id, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListSupplies(res.data?.listSupplies));
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
        category: record?.idCategory,
        description: record?.description,
        quantity: record?.quantity,
        brand: record?.brand,
        color: record?.color,
        size: record?.size,
        name: record?.name,
        image: record?.image,
      }),
    );
  };

  const handleExport = () => setOpenExport(true);

  const handleImport = () => setOpenImport(true);

  const handleCloseExport = () => setOpenExport(false);

  const handleCloseImport = () => setOpenImport(false);

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
      title: 'Tên vật tư',
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
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Thương hiệu',
      key: 'brand',
      dataIndex: 'brand',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Màu sắc',
      key: 'color',
      dataIndex: 'color',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Kích thước',
      key: 'size',
      dataIndex: 'size',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Ảnh',
      key: 'image',
      dataIndex: 'image',
      render: (url) => {
        if (url) {
          return (
            <img
              className="h-[50px] w-[50px]"
              src={`${process.env.REACT_APP_URL_API}/${url}`}
              alt="avatar"
            />
          );
        } else {
          return 'N/A';
        }
      },
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

  if (listSupplies) {
    listSupplies = listSupplies.map((supplies, index) => {
      return {
        ...supplies,
        key: index + 1,
        category: supplies?.category?.name,
        idCategory: supplies?.category?._id,
      };
    });
  }
  return (
    <div className="Supplies">
      <div className="container">
        <h1 className="heading box-shadow">Vật tư và thiết bị</h1>
        <Space size={'middle'}>
          <Button
            type="primary"
            className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
            onClick={handleCreate}
          >
            Tạo
          </Button>
          <Button
            type="primary"
            className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
            onClick={handleExport}
          >
            Xuất
          </Button>
          <Button
            type="primary"
            className="button-create box-shadow border-[3px] border-primary hover:!bg-white hover:!text-primary"
            onClick={handleImport}
          >
            Nhập
          </Button>
        </Space>
        <div className="Supplies__table">
          <Table
            pagination={{ position: ['bottomCenter'] }}
            loading={loading}
            columns={columns}
            dataSource={listSupplies}
          />
        </div>
        <ModalAdd />
        <ModalUpdate />
        <ModalExport open={openExport} handleClose={handleCloseExport} />
        <ModalImport open={openImport} handleClose={handleCloseImport} />
      </div>
    </div>
  );
};

export default Supplies;
