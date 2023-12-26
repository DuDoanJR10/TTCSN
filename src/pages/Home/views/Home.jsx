import React, { useEffect, useState } from 'react';
import '../styles/Home.scss';
import ItemCard from '../components/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import ModalView from '../components/ModalView';
import { Empty, Spin } from 'antd';
import { setModalView } from '../../Supplies/store/suppliesSlice';
import { getListSupplies } from '../../Supplies/api';
import showMessage from '../../../hooks/message-hooks';
import Slide from '../components/Slide';

const Home = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const modalView = useSelector((state) => state.supplies?.modalView);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getListSupplies().then((res) => {
      setLoading(false);
      if (res.data?.success) {
        setList(res.data?.listSupplies);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  }, []);
  const handleCancel = () => {
    dispatch(setModalView({ open: false }));
  };
  return (
    <div className="Home">
      <div className="container">
        <h1 className="heading box-shadow">Trang chủ</h1>
        <Slide />
        <h1 className="heading box-shadow">Vật tư và thiết bị</h1>
        <div className="Home__body">
          {!loading ? (
            <div className="grid flex-wrap grid-cols-1 sd:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 sm:gap-10 mb-12 xl:grid-cols-3 2xl:grid-cols-4">
              {list ? (
                list.map((item, index) => (
                  <ItemCard
                    setModalView={setModalView}
                    key={index}
                    item={item}
                  />
                ))
              ) : (
                <Empty description={false} />
              )}
            </div>
          ) : (
            <Spin />
          )}
        </div>
      </div>
      <ModalView
        handleClose={handleCancel}
        open={modalView?.open}
        data={modalView}
      />
    </div>
  );
};

export default Home;
