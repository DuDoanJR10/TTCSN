import { Modal, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import TextDisplay from '../../../components/TextDisplay';
import { useSelector } from 'react-redux';

const ModalReport = ({ open, handleClose, listExport, listImport, date }) => {
  const listSupplies = useSelector((state) => state?.supplies?.listSupplies);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
      render: (text) => text + 1,
    },
    {
      title: 'Mã vật tư',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên vật tư',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tồn đầu kỳ',
      dataIndex: 'start',
      key: 'start',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Nhập trong kỳ',
      dataIndex: 'importIn',
      key: 'importIn',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Xuất trong kỳ',
      dataIndex: 'exportIn',
      key: 'exportIn',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tồn cuối kỳ',
      dataIndex: 'end',
      key: 'end',
      render: (text) => <TextDisplay text={text} />,
    },
  ];

  const handleSupplies = (dataBill) => {
    let suppliesExport = dataBill?.reduce((init, bill) => {
      init = [...init, bill?.supplies];
      return init;
    }, []);
    suppliesExport = suppliesExport.flat();
    const listItemSupplies = suppliesExport?.reduce((init, supply) => {
      const itemSupplies = suppliesExport?.filter(
        (item) => item.name === supply.name,
      );
      suppliesExport = suppliesExport?.filter(
        (item) => item.name !== supply.name,
      );
      init = [...init, itemSupplies];
      return init;
    }, []);
    let listSuppliesExport = listItemSupplies?.filter(
      (item) => item.length > 0,
    );
    listSuppliesExport = listSuppliesExport?.map((listItem) => {
      return listItem.sort(
        (left, right) => moment(left?.created) - moment(right?.created),
      );
    });
    return listSuppliesExport;
  };

  const handleData = (dataExport = [], dataImport = []) => {
    const totalData = [...dataExport, ...dataImport];
    let suppliesTotal = handleSupplies(totalData);
    let listData = suppliesTotal?.map((listSupply) => {
      const start = listSupply[0]?.oldQuantity;
      const name = listSupply[0]?.name;
      let end = 0;
      let arrayImportIn = [];
      let arrayExportIn = [];  
      if (listSupply[listSupply.length - 1].hasOwnProperty('quantityImport')) {
        end =
          listSupply[listSupply.length - 1]?.oldQuantity +
          listSupply[listSupply.length - 1]?.quantityImport;
      } else {
        end =
          listSupply[listSupply.length - 1]?.oldQuantity -
          listSupply[listSupply.length - 1]?.quantityExport;
      }
      listSupply?.map((supply) => {
        if (supply.hasOwnProperty('quantityImport')) {
          arrayImportIn.push(supply?.quantityImport);
        } else {
          arrayExportIn.push(supply?.quantityExport);
        }
        return true;
      });
      const importIn = arrayImportIn?.reduce((a, b) => a + b, 0);
      const exportIn = arrayExportIn?.reduce((a, b) => a + b, 0);
      return {
        start,
        end,
        importIn,
        exportIn,
        _id: name,
      };
    });
    console.log('listData: ', listData);
    console.log('listSupplies: ', listSupplies);
    listData = listData?.map((data, index) => {
      return {
        ...data,
        name: getName(data?._id),
      };
    });
    console.log('listData: ', listData);
    let listSuppliesData = listSupplies.map((supplies) => {
      if (listData.length === 0) {
        return {
          name: supplies?.name,
          _id: supplies?._id,
          start: 0,
          end: 0,
          importIn: 0,
          exportIn: 0,
        };
      } else {
        const supplyExist = listData.find(
          (item) => item?._id === supplies?._id,
        );
        if (supplyExist) {
          return supplyExist;
        } else {
          return {
            name: supplies?.name,
            _id: supplies?._id,
            start: supplies?.quantity,
            end: supplies?.quantity,
            importIn: 0,
            exportIn: 0,
          };
        }
      }
    });
    console.log('listSuppliesData: ', listSuppliesData);
    listSuppliesData = listSuppliesData.map((data, index) => {
      return {
        ...data,
        key: index,
      };
    });
    return listSuppliesData;
  };

  const getName = (id) =>
    listSupplies.find((supply) => supply?._id === id)?.name;
  return (
    <Modal
      centered
      width={1200}
      title={
        <h2 className="text-center text-primary text-3xl">Phiếu báo cáo</h2>
      }
      onCancel={handleClose}
      footer={null}
      open={open}
    >
      <div className="flex text-lg justify-center mb-3">
        <h2 className="mr-1">{`TỪ NGÀY: ${moment(date?.fromDate).format(
          'DD/MM/YYYY',
        )}`}</h2>
        <h2>{`ĐẾN NGÀY: ${moment(date?.toDate).format('DD/MM/YYYY')}`}</h2>
      </div>
      <Table
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        dataSource={handleData(listExport, listImport)}
      />
    </Modal>
  );
};

export default ModalReport;
