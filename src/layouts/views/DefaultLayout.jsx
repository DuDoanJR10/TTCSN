import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import '../styles/DefaultLayout.scss';
import { Navigate } from 'react-router-dom';
import PermissionContent from '../../middlewares/PermissionContent';
import { useSelector } from 'react-redux';
import { routesAdmin, routesUser } from '../../routes/routes';

const Sidebar = React.lazy(() => import('../components/SidebarComponent'));
const Footer = React.lazy(() => import('../components/FooterComponent'));
const Header = React.lazy(() => import('../components/HeaderComponent'));

const loading = () => <Spin />;

const DefaultLayout = () => {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const admin = user?.role || 'user';
  const routes = admin === 'admin' ? routesAdmin : routesUser;

  return true ? (
    <Layout className="min-h-screen flex-row">
      <Suspense fallback={loading()}>
        <Sidebar admin={admin} />
      </Suspense>
      <Layout>
        <Suspense fallback={loading()}>
          <Header />
          <PermissionContent routes={routes} />
          <Footer />
        </Suspense>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default DefaultLayout;
