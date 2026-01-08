"use client";
import Product from "./Product"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

interface ProductItem{
  id: number
  title: string,
  images: string[]
  price: number
}

type SlideProductProps = {
  title: string
  data: ProductItem[]
}

const SlideProduct = ({title , data} : SlideProductProps) => {
  return (
    <div className="mt-20 bg-[aqua] py-3">
        <div className="container">
     <div>
        <h3 className="text-[30px] font-semibold">💯 {title}</h3>
        </div>
     <div className="flex items-center  gap-6">
        <Swiper    breakpoints={{
          0: {
            slidesPerView: 1,  // شاشة صغيرة: عرض منتج واحد
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,  // شاشة أكبر شوية: منتجين
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,  // شاشة لابتوب: ثلاثة منتجات
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,  // شاشة كبيرة: أربعة منتجات
            spaceBetween: 25,
          },
        }} autoplay={{ delay: 2500,  disableOnInteraction: false,}} loop={true} slidesPerView={4} navigation={true} modules={[Navigation , Autoplay]} className="mySwiper">
        {data.map((item) => {  
          return(
              <SwiperSlide><Product item={item}/></SwiperSlide>
          )
        })}
      </Swiper>
     </div>
        </div>
    </div>
  )
}

export default SlideProduct

