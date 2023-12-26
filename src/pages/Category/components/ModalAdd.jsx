import React from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import showMessage from '../../../hooks/message-hooks';
import { loginSuccess } from '../../Auth/store/authSlice';
import createAxios from '../../../utils/createAxios';
import { useSelector, useDispatch } from 'react-redux';
import { setModalAdd, setLoading, setListCategories } from '../store/categorySlice';
import { addCategory } from '../api';

const { TextArea } = Input;

const ModalAdd = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalAdd = useSelector((state) => state.category?.modalAdd);
  const loading = useSelector((state) => state.category?.loading);
  const user = useSelector(state => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleClose = () => {
    dispatch(setModalAdd({ open: false }));
  };

  const handleAdd = (values) => {
    const newCategory = {
      ...values,
      name: values.name?.trim(),
      description: values.description?.trim()
    };
    dispatch(setLoading(true));
    addCategory(newCategory, axiosJWT, user?.accessToken).then(res => {
        dispatch(setLoading(false));
        if (res.data?.success) {
            form.resetFields();
            dispatch(setListCategories(res.data?.Categories));
            showMessage().showSuccess(res.data?.message);
            dispatch(setModalAdd({ open: false }));
        } else {
            console.log(res.data?.error);
            showMessage().showError(res.data?.message);
        }
    })
  }

  return (
    <Modal
      centered
      title={<h2 className='text-center text-primary text-3xl'>Tạo danh mục</h2>}
      open={modalAdd?.open}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="add-category__form"
        name="add-category-form"
        layout="vertical"
        onFinish={handleAdd}
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
              Tạo
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
