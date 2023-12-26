import React, { useState } from 'react';
import ModalView from '../../pages/Home/components/ModalView';

const ItemSearch = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <>
      <div className="hover:bg-cyan-100 px-2 py-3 cursor-pointer leading-normal" onClick={handleOpen}>
        {data?.name}
      </div>
      <ModalView handleClose={handleClose} open={open} data={data}/>
    </>
  );
};

export default ItemSearch;
