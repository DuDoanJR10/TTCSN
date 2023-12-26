import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { getListImport } from '../api';
import showMessage from '../../../hooks/message-hooks';
import TextDisplay from '../../../components/TextDisplay';
import moment from 'moment';
import ViewImport from '../components/ViewImport';

const Import = () => {
  const [listImport, setListImport] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState({});
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    setLoading(true);
    getListImport(user?.accessToken, axiosJWT).then((res) => {
      setLoading(false);
      if (res.data?.success) {
        setListImport(res.data?.listImport);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên phiếu nhập',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (
        <TextDisplay text={moment(text).format('DD/MM/YYYY')} />
      ),
    },
  ];
  let customList = [];
  if (listImport) {
    customList = listImport.map((supplies, index) => {
      return {
        ...supplies,
        key: index + 1,
      };
    });
  }
  const handleClose = () => setOpen(false);

  const handleClick = (record, index) => {
    return {
      onClick: () => {
        setOpen(true);
        setRecord(record);
        console.log('record: ', record);
      },
    };
  };
  return (
    <>
      <div className="Import">
        <div className="container">
          <h1 className="heading box-shadow">Phiếu nhập</h1>
          <Table
            pagination={{ position: ['bottomCenter'] }}
            loading={loading}
            columns={columns}
            dataSource={customList}
            onRow={handleClick}
          />
        </div>
      </div>
      <ViewImport record={record} open={open} handleClose={handleClose} />
    </>
  );
};

export default Import;
