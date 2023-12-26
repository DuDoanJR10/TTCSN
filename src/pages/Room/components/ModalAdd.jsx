import React from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import showMessage from '../../../hooks/message-hooks';
import { loginSuccess } from '../../Auth/store/authSlice';
import createAxios from '../../../utils/createAxios';
import { useSelector, useDispatch } from 'react-redux';
import { setListRoom, setLoading, setModalAdd } from '../store/roomSlice';
import { addRoom } from '../api';

const { TextArea } = Input;

const ModalAdd = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalAdd = useSelector((state) => state.room?.modalAdd);
  const loading = useSelector((state) => state.room?.loading);
  const user = useSelector(state => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleClose = () => {
    dispatch(setModalAdd({ open: false }));
  };

  const handleAdd = (values) => {
    const newRoom = {
      ...values,
      name: values.name?.trim(),
      description: values.description?.trim()
    };
    dispatch(setLoading(true));
    addRoom(newRoom, axiosJWT, user?.accessToken).then(res => {
        dispatch(setLoading(false));
        if (res.data?.success) {
            form.resetFields();
            dispatch(setListRoom(res.data?.listRoom));
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
      title={<h2 className='text-center text-3xl text-primary'>Tạo phòng ban</h2>}
      open={modalAdd?.open}
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="add-room__form"
        name="add-room-form"
        layout="vertical"
        onFinish={handleAdd}
      >
        <Form.Item
          name="name"
          label="Tên phòng ban"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
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
