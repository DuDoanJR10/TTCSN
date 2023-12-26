import React from 'react';
import { Modal } from 'antd';
import TextDisplay from '../../../components/TextDisplay';
const avatarDefault = require('../../../assets/images/empty.png');

const ModalView = ({ open, data, handleClose }) => {
  const { description, category, quantity, brand, color, size, image, name } = data || {};
  return (
    <Modal
      width={900}
      className="modal-view"
      onCancel={handleClose}
      centered
      footer={null}
      open={open}
    >
      <div className="modal-view__container flex">
        <div className="w-[50%] overflow-hidden box-shadow rounded-lg ">
          <img
            className="w-full h-[500px] hover:scale-105 object-cover transition-all duration-300"
            src={`${
              image
                ? process.env.REACT_APP_URL_API + '/' + image
                : avatarDefault
            }`}
            alt="avatar"
          />
        </div>
        <div className="modal-view__container__content w-[50%] pl-5">
          <h2 className="text-center text-primary text-xl font-semibold">
            <TextDisplay text={name} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Mô tả</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={description} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Danh mục</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={category?.name} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Thương hiệu</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={brand} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Màu</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={color} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Số lượng</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={quantity} />
          </h2>
          <h2 className="text-base mt-2.5 mb-1.5">Kích thước</h2>
          <h2 className="bg-[#eaf0ee] text-base rounded-lg p-2.5">
            <TextDisplay text={size} />
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
