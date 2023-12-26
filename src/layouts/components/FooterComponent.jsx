import React from 'react';
import '../styles/Footer.scss';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  return <Footer className="Footer bg-[#ecfeff] px-0 py-5 ml-[245px]">
    <div className="container flex justify-between">
      <div className="">
        ©2023, made with <span className='text-red-600'>&hearts;</span> by <span className='text-[#b62cdf] font-bold'>Group 5 - TTCSN</span>.
      </div>
      <div className="flex">
        <p className='mr-2 cursor-pointer hover:underline'>About Us</p>
        <p className='cursor-pointer hover:underline'>Blog</p>
      </div>
    </div>
  </Footer>;
};

export default FooterComponent;
