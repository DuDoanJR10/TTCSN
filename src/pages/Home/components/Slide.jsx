import React from 'react';
import '../styles/Home.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

const slide1 = require('../../../assets/images/slide-1.jpg');
const slide2 = require('../../../assets/images/slide-2.jpg');
const slide3 = require('../../../assets/images/slide-3.jpg');
const slide4 = require('../../../assets/images/slide-4.jpg');
const slide5 = require('../../../assets/images/slide-5.jpg');
const slide6 = require('../../../assets/images/slide-6.jpg');
const slide7 = require('../../../assets/images/slide-7.jpg');
const slide8 = require('../../../assets/images/slide-8.jpg');

const Slide = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Autoplay, Pagination]}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      className="mySwiper mb-5 rounded-xl"
    >
      <SwiperSlide>
        <img className="img-slide" src={slide3} alt="slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide1} alt="slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide2} alt="slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide4} alt="slide 4" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide5} alt="slide 5" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide6} alt="slide 6" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide7} alt="slide 7" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="img-slide" src={slide8} alt="slide 8" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slide;
