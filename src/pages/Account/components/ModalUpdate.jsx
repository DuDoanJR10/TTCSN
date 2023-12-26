import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setListAccounts,
  setLoading,
  setModalUpdate,
} from '../store/accountSlice';
import { loginSuccess } from '../../Auth/store/authSlice';
import createAxios from '../../../utils/createAxios';
import { updateCategory } from '../api';
import showMessage from '../../../hooks/message-hooks';
import '../styles/Account.scss';
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ModalUpdate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.account?.loading);
  const modalUpdate = useSelector((state) => state.account?.modalUpdate);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const { username, address, phone, password, role } = modalUpdate;
    form.setFieldsValue({
      username,
      address,
      phone,
      password,
      role,
      confirm: password
    });
  }, [form, modalUpdate]);

  const validatorWhiteSpace = (rule, value, callback) => {
    if (value && value?.trim() === '') {
      callback('Vui lòng nhập tên người dùng hợp lệ không có dấu cách ở đầu!');
    } else {
      callback();
    }
  };

  const handleUpdate = (values) => {
    const updateAccount = {
      ...values,
      id: modalUpdate?.id,
      username: values.username?.trim(),
      password: values.password?.trim(),
      address: values.address?.trim(),
    };
    dispatch(setLoading(true));
    updateCategory(updateAccount, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        dispatch(setListAccounts(res.data?.Accounts));
        dispatch(
          setModalUpdate({
            open: false,
            username: '',
            password: '',
            phone: '',
            address: '',
            role: '',
          }),
        );
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

  const handleClose = () => {
    dispatch(setModalUpdate({ open: false }));
  };

  return (
    <Modal
      centered
      title={<h2 className='text-center text-primary text-3xl'>Sửa tài khoản</h2>}
      open={modalUpdate?.open}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        className="add-account__form"
        name="add-account__form"
        layout="vertical"
        form={form}
        onFinish={handleUpdate}
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
        <Form.Item>
          <Button
            className="m-auto flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
