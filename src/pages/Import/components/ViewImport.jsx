import React from 'react';
import moment from 'moment';
import { Modal, Table } from 'antd';
import TextDisplay from '../../../components/TextDisplay';

const ViewImport = ({ handleClose, open, record }) => {
  const { createdAt, name, supplies } = record || {};

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
      render: (text) => text + 1,
    },
    {
      title: 'Tên vật tư',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'quantityImport',
      key: 'quantityImport',
      render: (text) => <TextDisplay text={text} />,
    },
  ];
  const handleData = (listSupplies) => {
    if (listSupplies) {
      return listSupplies.map((supply) => ({
        ...supply,
        name: supply?.name?.name,
      }));
    } else {
      return [];
    }
  };
  return (
    <Modal
      open={open}
      centered
      title={<h2 className="text-center text-primary text-3xl">Phiếu nhập</h2>}
      footer={null}
      onCancel={handleClose}
    >
      <h2 className="text-base mt-2.5 mb-1.5">Tên phiếu nhập</h2>
      <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
        <TextDisplay text={name} />
      </h2>
      <h2 className="text-base mt-2.5 mb-1.5">Ngày nhập</h2>
      <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
        <TextDisplay text={moment(createdAt).format('DD/MM/YYYY')} />
      </h2>
      <h2 className="text-base mt-2.5 mb-1.5">Vật tư xuất</h2>
      <Table
        pagination={false}
        columns={columns}
        dataSource={handleData(supplies)}
      />
    </Modal>
  );
};

export default ViewImport;
