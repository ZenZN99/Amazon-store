"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero overflow-hidden relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/banner1.jpg" alt="banner1" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/banner2.jpg" alt="banner2" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/banner3.jpg" alt="banner3" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/banner4.jpg" alt="banner4" className="w-full" />
        </SwiperSlide>
      </Swiper>

      <div className="cards-hero flex items-center  flex-wrap  gap-6 justify-center  absolute top-64 z-1000">
        <div className="card-hero bg-white flex flex-col w-60 h-112.5 p-4">
          <h3 className="text-[20px] font-semibold text-center py-1">
            Special advantages <br /> for you
          </h3>
          <img className="w-100 h-75" src="/images/img-card1.jpg" alt="img" />
          <Link className="text-blue-600 pt-3" href="/">
            Shop now
          </Link>
        </div>

        <div className="card-hero bg-white flex flex-col w-100 h-112.5 p-4">
          <h3 className="text-[20px] font-semibold text-center py-1">
            ten 30-day <br /> lowest prices
          </h3>
          <img className="w-100 h-75" src="/images/img-card-2.jpg" alt="img" />
          <Link className="text-blue-600 pt-3" href="/">
            Shop now
          </Link>
        </div>

        <div className="card-hero bg-white flex flex-col w-100 h-112.5 p-4">
          <h3 className="text-[20px] font-semibold text-center py-1">
            15% net discount on daily needs in the basket
          </h3>
          <img className="w-100 h-75" src="/images/img-card3.jpg" alt="img" />
          <Link className="text-blue-600 pt-3" href="/">
            Shop now
          </Link>
        </div>

        <div className="card-hero bg-white flex flex-col w-100 h-112.5 p-4">
          <h3 className="text-[20px] font-semibold text-center py-1">
            150TL discount in your cart for purchases of 450TL and above
          </h3>
          <img className="w-100 h-75" src="/images/img-card4.jpg" alt="img" />
          <Link className="text-blue-600 pt-3" href="/">
            Shop now
          </Link>
        </div>
      </div>

      <div className="padding pb-12"></div>
    </div>
  );
};

export default Hero;
