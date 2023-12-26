import React from 'react';
import { Button, Input, Form, Radio, Modal, Space } from 'antd';
import createAxios from '../../../utils/createAxios';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../Auth/store/authSlice';
import {
  setListAccounts,
  setLoading,
  setModalAdd,
} from '../store/accountSlice';
import { addAccount } from '../api';
import showMessage from '../../../hooks/message-hooks';
import '../styles/Account.scss';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const ModalAdd = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.account?.loading);
  const modalAdd = useSelector((state) => state.account?.modalAdd);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleAdd = (values) => {
    const newAccount = {
      ...values,
      username: values.username?.trim(),
      password: values.password?.trim(),
      address: values.address?.trim(),
    };
    dispatch(setLoading(true));
    addAccount(newAccount, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        form.resetFields();
        dispatch(setListAccounts(res.data?.Accounts));
        showMessage().showSuccess(res.data?.message);
        dispatch(setModalAdd({ open: false }));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
      if (res.data?.toHome) {
        navigate('/');
      }
    });
  };

  const validatorWhiteSpace = (rule, value, callback) => {
    if (value && value?.trim() === '') {
      callback('Vui lòng nhập tên người dùng hợp lệ không có dấu cách ở đầu!');
    } else {
      callback();
    }
  };

  const handleClose = () => {
    dispatch(setModalAdd({ open: false }));
  };

  return (
    <Modal
      centered
      title={<h2 className="text-center text-primary text-3xl">Tạo tài khoản</h2>}
      open={modalAdd?.open}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        className="add-account__form"
        name="add-account__form"
        layout="vertical"
        form={form}
        onFinish={handleAdd}
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: 'Vui lòng nhập tên người dùng!' },
            { max: 12, message: 'Tên người dùng tối đa 12 ký tự!' },
            {
              validator: validatorWhiteSpace,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu ít nhất gồm 6 ký tự!' },
            { max: 16, message: 'Mật khẩu tối đa 16 ký tự!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận lại mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Mật khẩu mới bạn nhập không khớp!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ!' },
            { max: 250, message: 'Địa chỉ tối đa 250 ký tự!' },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
            {
              pattern: /^\d{10}$/, // Biểu thức chính quy cho 10 chữ số
              message: 'Vui lòng nhập số điện thoại gồm 10 chữ số!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" initialValue="user">
          <Radio.Group size="large">
            <Radio.Button value="user">Người dùng</Radio.Button>
            <Radio.Button value="admin">Người quản trị</Radio.Button>
          </Radio.Group>
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
              className="m-auto  flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
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
