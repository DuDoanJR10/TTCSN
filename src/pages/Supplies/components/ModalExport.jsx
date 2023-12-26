import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { exportSupplies, getListSupplies } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setExportSupplies, setListSupplies } from '../store/suppliesSlice';
import showMessage from '../../../hooks/message-hooks';
import { loginSuccess } from '../../Auth/store/authSlice';
import createAxios from '../../../utils/createAxios';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(true);
  const [list, setList] = useState([]);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  const listSuppliesExport = useSelector(
    (state) => state.supplies?.listSuppliesExport,
  );
  let listSuppliesMenu = [];

  useEffect(() => {
    getListSupplies().then((res) => {
      if (res.data?.success) {
        setList(res.data?.listSupplies);
      } else {
        console.log(res.data?.error);
      }
    });
  }, []);

  const handleDisabled = (supplies) => {
    if (listSuppliesExport.length === 0) {
      return false;
    } else {
      return !!listSuppliesExport.find(
        (itemSelected) => itemSelected.name === supplies?._id.toString(),
      );
    }
  };
  if (list) {
    listSuppliesMenu = list.map((supplies) => {
      return {
        value: supplies._id,
        label: supplies.name,
        disabled: handleDisabled(supplies),
      };
    });
  }
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({
        ...record,
        ...values,
      });
      console.log('values: ', {
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      dataIndex === 'name' ? (
        <Form.Item
          className="m-0"
          name={dataIndex}
          rules={[{ required: true, message: 'Vui lòng nhập vật tư!' }]}
        >
          <Select
            onBlur={save}
            options={listSuppliesMenu}
            showSearch
            filterOption={filterOption}
          ></Select>
        </Form.Item>
      ) : (
        <Form.Item
          name={dataIndex}
          className="m-0"
          initialValue={1}
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng!' },
            ({ getFieldValue, setFieldValue }) => ({
              validator(_, value) {
                const supplies = list.find(
                  (supplies) =>
                    supplies?._id?.toString() ===
                    getFieldValue('name')?.toString(),
                );
                if (supplies?.quantity === 0) {
                  setFieldValue('quantity', 0);
                  return Promise.reject(
                    new Error('Hết vật tư!')
                  )
                } else if (value > supplies?.quantity && supplies) {
                  setFieldValue('quantity', supplies?.quantity);
                  return Promise.reject(
                    new Error(
                      `Số lượng phải nhỏ hơn hoặc bằng ${supplies?.quantity}`,
                    ),
                  );
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <InputNumber ref={inputRef} min={1} onBlur={save} />
        </Form.Item>
      )
    ) : (
      <div className="editable-cell-value-wrap pr-6" onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const ModalExport = ({ open, handleClose }) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listStaffSelected, setListStaffSelected] = useState([]);
  const listStaff = useSelector((state) => state?.staff?.listStaff);
  const listRoom = useSelector((state) => state?.room?.listRoom);
  const listSuppliesExport = useSelector(
    (state) => state.supplies?.listSuppliesExport,
  );
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    console.log('dataSourceNew: ', newData);
    dispatch(setExportSupplies(newData));
    setDataSource(newData);
  };

  const columnsDefault = [
    {
      title: 'Tên vật tư',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const getMenu = (listRoom) => {
    return listRoom.map((room) => ({
      label: room?.name,
      value: room?._id,
    }));
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: '',
      quantity: 1,
    };
    dispatch(setExportSupplies([...listSuppliesExport, newData]));
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log('newData: ', newData);
    dispatch(setExportSupplies(newData));
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = columnsDefault.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const handleCancel = () => {
    handleClose();
    setCount(0);
    form.resetFields();
    setDataSource([]);
    dispatch(setExportSupplies([]));
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleChangeRoom = () => {
    const roomId = form.getFieldValue('room');
    form.setFieldValue('staff', '');
    const listStaffSelectedByRoom = listStaff.filter(
      (staff) => staff?.room?._id.toString() === roomId.toString(),
    );
    setListStaffSelected(listStaffSelectedByRoom);
  };

  const validatorWhiteSpace = (rule, value, callback) => {
    if (value && value?.trim() === '') {
      callback('Vui lòng nhập tên phiếu xuất hợp lệ không có dấu cách ở đầu!');
    } else {
      callback();
    }
  };

  const handleExport = (values) => {
    if (listSuppliesExport.length !== 0) {
      const listExport = listSuppliesExport
        .filter((item) => item.name)
        .filter(item => item.quantity)
        .map((item, index) => ({ ...item, key: index }));
      if (listExport.length === 0) {
        showMessage().showError('Vui lòng nhập thông tin vật tư!')
        return false;
      }
      const dataExport = {
        supplies: listExport,
        name: values?.name?.trim(),
        room: values?.room,
        staff: values?.staff,
      };
      setLoading(true);
      exportSupplies(dataExport, axiosJWT, user?.accessToken).then((res) => {
        setLoading(false);
        if (res.data.success) {
          handleCancel();
          form.resetFields();
          getListSupplies().then((res) => {
            if (res.data?.success) {
              dispatch(setListSupplies(res.data?.listSupplies));
            } else {
              console.log(res.data?.error);
            }
          });
          showMessage().showSuccess(res.data?.message);
        } else {
          console.log(res.data?.error);
          showMessage().showError(res.data?.message);
        }
      });
    } else {
      showMessage().showError('Vui lòng nhập thông tin vật tư!');
    }
  };
  return (
    <Modal
      title={
        <h2 className="text-center text-primary text-3xl">Phiếu xuất kho</h2>
      }
      footer={null}
      onCancel={() => {
        handleCancel();
      }}
      centered
      open={open}
    >
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Thêm vật tư
      </Button>
      <Table
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={listSuppliesExport}
        columns={columns}
        className="mb-5"
      />
      <Form form={form} onFinish={handleExport}>
        <Form.Item
          name="name"
          label="Tên phiếu xuất kho"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phiếu xuất kho!' },
            {
              validator: validatorWhiteSpace,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="room"
          label="Phòng ban nhận"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng ban nhận!' },
          ]}
        >
          <Select
            options={getMenu(listRoom)}
            showSearch
            onChange={handleChangeRoom}
            filterOption={filterOption}
          ></Select>
        </Form.Item>
        <Form.Item
          name="staff"
          label="Nhân viên nhận"
          rules={[
            { required: true, message: 'Vui lòng nhập tên nhân viên nhận!' },
          ]}
        >
          <Select
            options={getMenu(listStaffSelected)}
            showSearch
            filterOption={filterOption}
          ></Select>
        </Form.Item>
        <Space align="center" className="w-full justify-end">
          <Form.Item>
            <Button
              className="m-auto flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="m-auto flex text-black items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Xuất
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalExport;
