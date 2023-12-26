import React from 'react';
import { Button, Result } from 'antd';

const NotPage = () => {
  return (
    <Result
      className="min-h-screen"
      status="404"
      title="404"
      subTitle={
        <h2 className="text-lg">Xin lỗi, trang bạn truy cập không tồn tại!</h2>
      }
      extra={
        <Button
          href="/"
          className="box-shadow text-2xl py-2 bg-primary text-white font-semibold hover:!text-primary border-primary border-[3px]"
          type="link"
        >
          Trang chủ
        </Button>
      }
    />
  );
};

export default NotPage;
