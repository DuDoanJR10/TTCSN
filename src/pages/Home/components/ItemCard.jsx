import React from 'react';
import '../styles/ItemCard.scss';
import { FaBagShopping } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

const avatarDefault = require('../../../assets/images/empty.png');

const ItemCard = ({ item, setModalView }) => {
  const dispatch = useDispatch();
  const { name, quantity, image, category, size, brand, color, description } =
    item;
  const src = `${process.env.REACT_APP_URL_API}/${image}`;
  return (
    <div
      onClick={() =>
        dispatch(
          setModalView({
            open: true,
            name,
            quantity,
            image,
            category,
            size,
            brand,
            color,
            description,
          }),
        )
      }
      className="card relative overflow-hidden shadow-md shadow-[#16405b] hover:shadow-lg hover:shadow-[#16405b] hover:translate-y-[-1px] transition-all ease-linear rounded-xl cursor-pointer"
    >
      <img
        src={image ? src : avatarDefault}
        className="w-full h-[400px] object-cover relative"
        alt="Movie"
      />
      <div className="p-4 text-white bg-[rgba(0,0,0,.8)] absolute bottom-0 left-0 right-0">
        <h4 className="h-[32px] text-center overflow-hidden text-ellipsis whitespace-nowrap ">
          {name}
        </h4>
      </div>
      <div className="flex items-center absolute text-white top-2 left-2 px-3 py-1 bg-primary rounded-lg">
        <FaBagShopping />
        <p className="ml-2">{quantity}</p>
      </div>
    </div>
  );
};

export default ItemCard;
