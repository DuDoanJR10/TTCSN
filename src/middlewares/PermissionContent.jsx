import { Spin, Layout } from 'antd';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const { Content } = Layout;

const PermissionContent = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, idx) => {
        return (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<Spin />}>
                  <Content className="bg-white mt-[60px] overflow-auto ml-[245px]">
                    <route.element />
                  </Content>
                </Suspense>
              }
            />
          )
        );
      })}
    </Routes>
  );
};

export default PermissionContent;
