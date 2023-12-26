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
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setListSupplies,
  setLoading,
  setModalUpdate,
} from '../store/suppliesSlice';
import { updateSupplies } from '../api';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import showMessage from '../../../hooks/message-hooks';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ModalUpdate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalUpdate = useSelector((state) => state.supplies?.modalUpdate);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [fileImage, setFileImage] = useState('');
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let listCategories = useSelector((state) => state.category?.listCategories);
  const listCategoriesMenu = listCategories.map((category) => {
    return {
      value: category._id,
      label: category.name,
    };
  });
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const { name, description, size, color, brand, category, quantity, image } =
      modalUpdate;
    setFileImage(image);
    if (image) {
      setFileList([
        {
          url: `${process.env.REACT_APP_URL_API}/${image}`,
        },
      ]);
    } else {
      setFileList([]);
    }
    form.setFieldsValue({
      name,
      description,
      size,
      color,
      brand,
      category,
      quantity,
    });
  }, [form, modalUpdate]);
  const handleUpdate = (values) => {
    dispatch(setLoading(true));
    const newSupplies = {
      ...values,
      name: values.name?.trim(),
      description: values.description?.trim(),
      brand: values.brand?.trim(),
      size: values.size?.trim(),
      color: values.color?.trim(),
      id: modalUpdate.id,
      category: values.category,
      image: fileImage,
    };
    console.log('updateSupplies: ', newSupplies);
    dispatch(setLoading(true));
    updateSupplies(newSupplies, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        form.resetFields();
        dispatch(setListSupplies(res.data?.listSupplies));
        setFileList([]);
        dispatch(setModalUpdate({ open: false }));
        showMessage().showSuccess(res.data?.message);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };
  const handleClose = () => {
    dispatch(setModalUpdate({ open: false }));
    setFileList([]);
    setFileImage('');
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleChangeUpload = ({ file, fileList }) => {
    console.log('file: ', file);
    setFileList(fileList);
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
      open={modalUpdate?.open}
      centered
      title={<h2 className="text-center text-primary text-3xl">Sửa vật tư</h2>}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="update-supplies__form"
        name="update-supplies-form"
        layout="vertical"
        onFinish={handleUpdate}
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
          fileList={fileList}
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
          <InputNumber min={0}/>
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
              className="m-auto flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              htmlType="submit"
              loading={modalUpdate?.loading}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
