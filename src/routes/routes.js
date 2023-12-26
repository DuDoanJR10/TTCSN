import React from 'react';
import configs from '../configs';

const Home = React.lazy(() => import('../pages/Home/views/Home'));
const Category = React.lazy(() => import('../pages/Category/views/Category'));
const Supplies = React.lazy(() => import('../pages/Supplies/views/Supplies'));
const NotPage = React.lazy(() => import('../pages/NotPage/views/NotPage'));
const Account = React.lazy(() => import('../pages/Account/views/Account'));
const Room = React.lazy(() => import('../pages/Room/views/Room'));
const Staff = React.lazy(() => import('../pages/Staff/views/Staff'));
const Export = React.lazy(() => import('../pages/Export/views/Export'));
const Import = React.lazy(() => import('../pages/Import/views/Import'));
const Report = React.lazy(() => import('../pages/Report/views/Report'));

export const routesAdmin = [
  {
    path: configs.routes.home,
    exact: true,
    element: Home,
  },
  {
    path: configs.routes.category,
    exact: true,
    element: Category,
    footer: true,
  },
  {
    path: configs.routes.supplies,
    exact: true,
    element: Supplies,
    footer: true,
  },
  {
    path: configs.routes.account,
    exact: true,
    element: Account,
    footer: true,
  },
  {
    path: configs.routes.notPage,
    exact: true,
    element: NotPage,
    footer: true,
  },
  {
    path: configs.routes.room,
    exact: true,
    element: Room,
    footer: true,
  },
  {
    path: configs.routes.staff,
    exact: true,
    element: Staff,
    footer: true,
  },
  {
    path: configs.routes.export,
    exact: true,
    element: Export,
    footer: true,
  },
  {
    path: configs.routes.import,
    exact: true,
    element: Import,
    footer: true,
  },
  {
    path: configs.routes.report,
    exact: true,
    element: Report,
    footer: true,
  },
];

export const routesUser = [
  {
    path: configs.routes.home,
    exact: true,
    element: Home,
  },
  {
    path: configs.routes.notPage,
    exact: true,
    element: NotPage,
    footer: true,
  },
]