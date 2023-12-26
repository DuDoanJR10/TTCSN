import { Modal, Input, Form, Button, Space, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setListStaff, setLoading, setModalAdd } from '../store/staffSlice';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { addStaff } from '../api';
import showMessage from '../../../hooks/message-hooks';

const ModalAdd = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalAdd = useSelector((state) => state.staff?.modalAdd);
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let listRoom = useSelector((state) => state.room?.listRoom);
  const loading = useSelector(state => state?.staff?.loading);
  let listRoomMenu = [];
  if (listRoom) {
    listRoomMenu = listRoom.map((room) => {
      return {
        value: room._id,
        label: room.name,
      };
    });
  }

  const handleAdd = (values) => {
    const newStaff = {
      ...values,
      name: values?.name?.trim(),
      phone: values?.phone?.trim(),
    };
    dispatch(setLoading(true));
    addStaff(newStaff, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data.success) {
        form.resetFields();
        dispatch(setListStaff(res.data?.listStaff));
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

  return (
    <Modal
      open={modalAdd?.open}
      centered
      title={
        <h2 className="text-center text-primary text-3xl">Tạo nhân viên</h2>
      }
      footer={null}
      onCancel={handleClose}
    >
      <Form
        form={form}
        className="add-staff__form"
        name="add-staff-form"
        layout="vertical"
        onFinish={handleAdd}
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
              className="m-auto flex  text-black items-center text-xl justify-center min-w-[140px] font-semibold"
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
