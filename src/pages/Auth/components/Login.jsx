import React from 'react';
import '../styles/Login.scss';
import { Button, Form, Input, Radio } from 'antd';
import showMessage from '../../../hooks/message-hooks';
import { login } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginStart, loginSuccess } from '../store/authSlice';

const Login = ({ showModalRegister, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.login.loading)

  const onFinish = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
      role: values.role
    }
    dispatch(loginStart());
    try {
      const data = await login(user);
      if (data?.success) {
        handleCancel();
        form.resetFields();
        dispatch(loginSuccess(data?.user));
        showMessage().showSuccess(data?.message);
      } else {
        dispatch(loginFailed());
        showMessage().showError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Login">
      <h2 className="Login__title text-primary text-center text-4xl leading-normal font-bold">
        Đăng nhập
      </h2>
      <Form
        form={form}
        className="Login__form"
        name="login-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" initialValue="user">
          <Radio.Group size="large">
            <Radio.Button value="user">Người dùng</Radio.Button>
            <Radio.Button value="admin">Người quản trị</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button
          className="block px-0 mb-2"
          type="link"
          onClick={showModalRegister}
        >
          Bạn chưa có tài khoản? Đăng ký ngay!
        </Button>
        <Form.Item className='m-0'>
          <Button
            className="m-auto w-full flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
