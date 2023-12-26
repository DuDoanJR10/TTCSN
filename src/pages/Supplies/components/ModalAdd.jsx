import {
  Modal,
  Input,
  Form,
  Button,
  Space,
  Select,
  InputNumber,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setListSupplies,
  setLoading,
  setModalAdd,
} from '../store/suppliesSlice';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { addSupplies } from '../api';
import showMessage from '../../../hooks/message-hooks';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ModalAdd = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalAdd = useSelector((state) => state.supplies?.modalAdd);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [fileImage, setFileImage] = useState('');
  let listCategories = useSelector((state) => state.category?.listCategories);
  let listCategoriesMenu = [];
  if (listCategories) {
    listCategoriesMenu = listCategories.map((category) => {
      return {
        value: category._id,
        label: category.name,
      };
    });
  }
  const handleAdd = (values) => {
    const newSupplies = {
      ...values,
      name: values?.name?.trim(),
      description: values?.description?.trim(),
      brand: values?.brand?.trim(),
      size: values?.size?.trim(),
      color: values?.color?.trim(),
      image: fileImage,
    };
    dispatch(setLoading(true));
    addSupplies(newSupplies, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        form.resetFields();
        setFileImage('');
        dispatch(setListSupplies(res.data?.listSupplies));
        dispatch(setModalAdd({ open: false }));
        showMessage().showSuccess(res.data?.message);
      } else {
        console.log('error');
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };
  const handleClose = () => {
    dispatch(setModalAdd({ open: false }));
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleChangeUpload = ({ file }) => {
    if (file?.status === 'done') {
      const filePath = file?.response?.filePath.split('\\')[1];
      setFileImage(filePath);
      showMessage().showSuccess(file?.response?.message);
    }
    if (file?.status === 'error') {
      setFileImage('');
      showMessage().showError(file?.response?.message);
    }
    if (file?.status === 'removed') {
      setFileImage('');
    }
  };
  return (
    <Modal
      open={modalAdd?.open}
      centered
      title={<h2 className="text-center text-primary text-3xl">Tạo vật tư</h2>}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="add-supplies__form"
        name="add-supplies-form"
        layout="vertical"
        onFinish={handleAdd}
      >
        <Form.Item
          name="name"
          label="Tên vật tư"
          rules={[{ required: true, message: 'Vui lòng nhập tên vật tư!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <TextArea />
        </Form.Item>

        <Form.Item label="Thương hiệu" name="brand">
          <Input />
        </Form.Item>
        <Form.Item label="Kích thước" name="size">
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="category">
          <Select
            options={listCategoriesMenu}
            showSearch
            filterOption={filterOption}
          ></Select>
        </Form.Item>

        <Form.Item label="Màu" name="color">
          <Input />
        </Form.Item>
        <p className="mb-2">Ảnh</p>
        <Upload
          name="file"
          action={`${process.env.REACT_APP_URL_API}/v1/api/supplies/upload`}
          method="POST"
          onChange={handleChangeUpload}
          maxCount={1}
          listType="picture-card"
          accept={['image/png', 'image/jpg', 'image/jpeg']}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        </Upload>
        <Form.Item label="Số lượng" name="quantity">
          <InputNumber min={0} />
        </Form.Item>

        <Space align="center" className="w-full justify-end">
          <Form.Item className="m-0">
            <Button
              className="m-auto flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
              onClick={handleClose}
            >
              Hủy
            </Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              className="m-auto flex  text-black items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              htmlType="submit"
              loading={modalAdd?.loading}
            >
              Tạo
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
