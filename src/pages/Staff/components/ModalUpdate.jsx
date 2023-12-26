import { Modal, Input, Form, Button, Space, Select } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setListStaff, setLoading, setModalUpdate } from '../store/staffSlice';
import { updateStaff } from '../api';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import showMessage from '../../../hooks/message-hooks';

const ModalUpdate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.staff?.loading);
  const modalUpdate = useSelector((state) => state.staff?.modalUpdate);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let listRoom = useSelector((state) => state.room?.listRoom);
  const listRoomMenu = listRoom.map((room) => {
    return {
      value: room._id,
      label: room.name,
    };
  });
  useEffect(() => {
    const { name, phone, room } = modalUpdate || {};
    form.setFieldsValue({
      name,
      phone,
      room,
    });
  }, [form, modalUpdate]);
  const handleUpdate = (values) => {
    const newStaff = {
      ...values,
      name: values.name?.trim(),
      phone: values?.phone?.trim(),
      id: modalUpdate.id,
      room: values?.room,
    };
    dispatch(setLoading(true));
    updateStaff(newStaff, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        form.resetFields();
        dispatch(setListStaff(res.data?.listStaff));
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
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      open={modalUpdate?.open}
      centered
      title={
        <h2 className="text-center text-primary text-3xl">Sửa nhân viên</h2>
      }
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="update-staff__form"
        name="update-staff-form"
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Tên nhân viên"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phòng ban" name="room">
          <Select
            options={listRoomMenu}
            showSearch
            filterOption={filterOption}
          ></Select>
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
