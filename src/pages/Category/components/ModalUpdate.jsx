import { Button, Modal, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setListCategories,
  setLoading,
  setModalUpdate,
} from '../store/categorySlice';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { updateCategory } from '../api';
import showMessage from '../../../hooks/message-hooks';

const { TextArea } = Input;

const ModalUpdate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalUpdate = useSelector((state) => state.category?.modalUpdate);
  const loading = useSelector((state) => state.category?.loading);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    const { name, description } = modalUpdate;
    form.setFieldsValue({
      name,
      description,
    });
  }, [form, modalUpdate]);
  const handleClose = () => {
    dispatch(
      setModalUpdate({ open: false, id: '', name: '', description: '' }),
    );
  };
  const handleUpdate = (values) => {
    dispatch(setLoading(true));
    const newCategory = {
      ...values,
      name: values.name?.trim(),
      description: values.description?.trim(),
      id: modalUpdate?.id,
    };
    updateCategory(newCategory, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListCategories(res.data?.Categories));
        showMessage().showSuccess(res.data?.message);
        dispatch(
          setModalUpdate({ open: false, id: '', name: '', description: '' }),
        );
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };
  return (
    <Modal
      centered
      title={<h2 className='text-center text-3xl text-primary'>Sửa danh mục</h2>}
      open={modalUpdate?.open}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="update-category__form"
        name="update-category-form"
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <TextArea />
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
              loading={loading}
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
