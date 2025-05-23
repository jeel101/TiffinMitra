import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HeroSliderCard from './HeroSliderCard';
import { Autoplay, Pagination, Navigation } from "swiper";

const slidesData = [
  {
    title: "Get Your Meals Delivered from Curated Home Chefs Around You",
    img: "https://alignthoughts.com/wp-content/uploads/2016/10/align-thoughts-indian-thali.jpg"
  },
  {
    title: "Food Is Our Common Ground, Universal Experience",
    img: "https://imgs.search.brave.com/QtZppep4gzh0sfbCVSUaSrHeBSLuMppfQSLjoFPEeDw/rs:fit:1200:628:1/g:ce/aHR0cHM6Ly9pbWdz/dGF0aWNjb250ZW50/LmxiYi5pbi9sYmJu/ZXcvd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzIvMjAxOC8w/NS8yMjIxMzM1OS9I/b21lbHkxLmpwZz93/PTEyMDAmaD02Mjgm/ZmlsbD1ibHVyJmZp/dD1maWxs"
  },
  {
    title: "Happiness Is The Smell Of Your Favourite Food. Get It Here",
    img: "https://imgs.search.brave.com/dwzMINAc1hsf9-eiM-TkcOrU-SyE3VFc134CVEfE4w8/rs:fit:1200:800:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RlLzE0/Lzc2L2RlMTQ3NjJl/MTIzOWE1YmEzNTU4/ZGZkYTgwYmFmNzhi/LmpwZw"
  }
];

function HeroSliderLg() {
  return (
    <div className='px-2 my-2 hidden lg:block'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        speed={900}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slidesData.map((data, index) => (
          <SwiperSlide key={index}>
            <HeroSliderCard title={data.title} img={data.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function HeroSliderMd() {
  return (
    <div className='lg:hidden block'>
      {slidesData.map((data, index) => (
        <div key={index} className="relative w-full h-[300px]">
          <img src={data.img} alt="Slide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="hero-slider-title !text-black-400 text-2xl md:text-3xl font-bold text-center">
              {data.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}


export default function HeroSlider() {
  return (
    <>
      <HeroSliderLg />
      <HeroSliderMd />
    </>
  );
}
