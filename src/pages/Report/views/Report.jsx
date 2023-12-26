import React, { useState } from 'react';
import { getListReport } from '../api';
import { Button, DatePicker, Form } from 'antd';
import ModalExport from '../components/ModalReport';
import createAxios from '../../../utils/createAxios';
import { useDispatch, useSelector } from 'react-redux';
import showMessage from '../../../hooks/message-hooks';
import { loginSuccess } from '../../Auth/store/authSlice';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Report = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [listExport, setListExport] = useState();
  const [listImport, setListImport] = useState();
  const [open, setOpen] = useState();
  const [date, setDate] = useState({});
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleReport = (values) => {
    const date = {
      fromDate: values?.range[0].format('YYYY-MM-DD 00:00:00'),
      toDate: values?.range[1].format('YYYY-MM-DD 23:59:59'),
    };
    setDate(date);
    getListReport(date, user?.accessToken, axiosJWT).then((res) => {
      if (res.data?.success) {
        setListExport(res.data?.exportReport);
        setListImport(res.data?.importReport);
        showMessage().showSuccess(res.data?.message);
        setOpen(true);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };

  const handleClose = () => setOpen(false);
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }
  return (
    <>
      <div className="Report">
        <div className="container">
          <h1 className="heading box-shadow">Báo cáo</h1>
          <Form form={form} onFinish={handleReport}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian!',
                },
              ]}
              name="range"
              label="Chọn ngày"
            >
              <RangePicker format={'DD/MM/YYYY'} disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xem báo cáo
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalExport
        listExport={listExport}
        listImport={listImport}
        date={date}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Report;
