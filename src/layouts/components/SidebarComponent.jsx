import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.scss';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaCircleUser,
  FaDatabase,
  FaLayerGroup,
  FaHotel,
  FaUserGroup,
  FaFolderClosed,
  FaFileArrowUp,
  FaFileArrowDown,
} from 'react-icons/fa6';

const menuAdmin = [
  {
    key: 0,
    label: <Link to="/">Trang chủ</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaHouse className="icon-menu" />
      </div>
    ),
  },
  {
    key: 1,
    label: <Link to="/category">Danh mục</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaLayerGroup className="icon-menu" />
      </div>
    ),
  },
  {
    key: 2,
    label: <Link to="/supplies">Vật tư và thiết bị</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaDatabase className="icon-menu" />
      </div>
    ),
  },
  {
    key: 3,
    label: <Link to="/account">Tài khoản</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaCircleUser className="icon-menu" />
      </div>
    ),
  },
  {
    key: 4,
    label: <Link to="/staff">Nhân viên</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaUserGroup className="icon-menu" />
      </div>
    ),
  },
  {
    key: 5,
    label: <Link to="/room">Phòng ban</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaHotel className="icon-menu" />
      </div>
    ),
  },
  {
    key: 6,
    label: <Link to="/export">Phiếu xuất</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaFileArrowUp className="icon-menu" />
      </div>
    ),
  },
  {
    key: 7,
    label: <Link to="/import">Phiếu nhập</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaFileArrowDown className="icon-menu" />
      </div>
    ),
  },
  {
    key: 8,
    label: <Link to="/report">Báo cáo</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaFolderClosed className="icon-menu" />
      </div>
    ),
  },
];

const menuUser = [
  {
    key: 0,
    label: <Link to="/">Trang chủ</Link>,
    icon: (
      <div className="Sidebar__icon">
        <FaHouse className="icon-menu" />
      </div>
    ),
  },
];

const redirectLinks = [
  '/',
  '/category',
  '/supplies',
  '/account',
  '/staff',
  '/room',
  '/export',
  '/import',
  '/report',
];

const SidebarComponent = ({ className, admin }) => {
  const location = useLocation();
  const [active, setActive] = useState(
    redirectLinks.findIndex((link) => link === location.pathname).toString(),
  );

  const menuSidebar = admin === 'admin' ? menuAdmin : menuUser;

  useEffect(() => {
    setActive(
      redirectLinks.findIndex((link) => link === location.pathname).toString(),
    );
  }, [location.pathname]);

  return (
    <div
      className={`${className} Sidebar bg-second fixed shrink-0 overflow-auto h-screen text-white w-[245px]`}
    >
      <div className="flex w-full flex-col justify-between h-full">
        <div className="h-fit">
          <Link to="/" className="block bg-second">
            <p className="Sidebar__logo border-b-4 border-white bg-second text-third my-0 mx-3 pl-[18px] text-3xl leading-[44px] py-2">
              Hồng Ngọc
            </p>
          </Link>
          <Menu
            className="h-fit bg-second px-3 py-5"
            mode="vertical"
            items={menuSidebar}
            selectedKeys={active}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
