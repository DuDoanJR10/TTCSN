import React, { useEffect, useRef, useState } from 'react';
import '../styles/Header.scss';
import { Layout, Space, Button, Dropdown } from 'antd';
import Auth from '../../pages/Auth/views/Auth';
import { useSelector } from 'react-redux';
import { FaCircleUser, FaArrowRightFromBracket } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import {
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from '../../pages/Auth/store/authSlice';
import { logout } from '../../pages/Auth/api';
import createAxios from '../../utils/createAxios';
import showMessage from '../../hooks/message-hooks';
import { BiSearch, BiXCircle } from 'react-icons/bi';
import ItemSearch from '../../components/ItemSearch/ItemSearch';
import useDebounce from '../../hooks/useDebounce';
import { getListSupplies } from '../../pages/Supplies/api';
import HeadlessTippy from '@tippyjs/react/headless';

const { Header } = Layout;

const HeaderComponent = () => {
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listSupplies, setListSupplies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();
  const [showResult, setShowResult] = useState(false);
  const debounceValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      const data = await logout(axiosJWT, user?.accessToken, user?._id);
      if (data?.success) {
        dispatch(logoutSuccess());
        navigate('/');
        showMessage().showSuccess(data?.message);
      } else {
        dispatch(logoutFailed());
        showMessage().showError(data.message);
      }
    } catch (error) {
      dispatch(logoutFailed());
      console.log(error);
    }
  };

  const iconLogout = () => (
    <div className="flex items-center">
      <FaArrowRightFromBracket className="mr-2 text-base" />
      <p onClick={handleLogout}>Đăng xuất</p>
    </div>
  );

  const items = [{ key: '0', label: iconLogout() }];

  const showModalLogin = () => {
    setType(true);
    setOpen(true);
  };

  const showModalRegister = () => {
    setType(false);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setShowResult(false);
    setSearchResult([]);
    setSearchValue('');
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const clickIconSearch = () => {
    if (!searchValue) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    getListSupplies().then((res) => {
      if (res.data?.success) {
        setListSupplies(res.data?.listSupplies);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  }, []);

  useEffect(() => {
    if (!debounceValue?.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      if (listSupplies.length) {
        const result = listSupplies.filter((supplies) =>
          supplies?.name.toLowerCase().includes(debounceValue.toLowerCase()),
        );
        // fake call api search
        const id = setTimeout(() => {
          setSearchResult(result);
          setLoading(false);
        }, 300);
        return () => clearTimeout(id);
      }
    };
    fetchApi();
  }, [debounceValue, listSupplies]);

  return (
    <>
      <Header className="flex fixed right-0 left-[245px] z-[99] shadow-md bg-white h-[60px] p-0">
        <div className="container flex justify-between">
          <div className="Header__search flex items-center w-[450px]">
            <div className="relative w-full h-[40px] flex">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3">
                <BiSearch
                  onClick={clickIconSearch}
                  className="cursor-pointer text-2xl hover:scale-105"
                />
              </div>
              <HeadlessTippy
                onClickOutside={() => setShowResult(false)}
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                  <div className="w-[450px] overflow-x-hidden overflow-y-auto bg-fifth z-[99] rounded-xl box-shadow">
                    {searchResult?.map((item, index) => (
                      <ItemSearch key={index} data={item} />
                    ))}
                  </div>
                )}
              >
                <input
                  spellCheck={false}
                  onFocus={() => setShowResult(true)}
                  onChange={handleChange}
                  ref={inputRef}
                  value={searchValue}
                  type="text"
                  id="simple-search"
                  className="input h-full border-2 border-third w-full rounded-full pl-10 pr-10"
                  placeholder="Tìm kiếm vật tư và thiết bị"
                  required
                />
              </HeadlessTippy>
              {!!searchValue && !loading && (
                <div
                  onClick={handleClear}
                  className="flex absolute right-3 top-0 items-center h-full"
                >
                  <BiXCircle
                    className="cursor-pointer hover:scale-105"
                    size={'1.5rem'}
                  />
                </div>
              )}
              {loading && (
                <div className="flex w-[24px] justify-center text-xl right-3 top-0 items-center h-full absolute">
                  <LoadingOutlined />
                </div>
              )}
            </div>
          </div>
          <div className="Header__auth flex items-center">
            {user?.username ? (
              <Dropdown menu={{ items }}>
                <Button
                  className="!h-10 flex items-center box-shadow"
                  type="primary"
                  icon={<FaCircleUser className="text-2xl" />}
                >
                  {user?.username}
                </Button>
              </Dropdown>
            ) : (
              <Space className="h-[60px]">
                <Button
                  className="box-shadow text-lg !h-[46px] items-center hover:!bg-white hover:!text-primary border-primary border-[3px]"
                  type="primary"
                  onClick={showModalLogin}
                >
                  Đăng nhập
                </Button>
                <Button
                  className="box-shadow text-lg !h-[46px] items-center hover:!text-primary hover:!bg-white border-primary border-[3px]"
                  type="primary"
                  onClick={showModalRegister}
                >
                  Đăng ký
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Header>
      <Auth
        showModalRegister={showModalRegister}
        showModalLogin={showModalLogin}
        type={type}
        open={open}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default HeaderComponent;
