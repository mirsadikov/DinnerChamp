import { img_endpoint } from '@/config/variables';
import defaultImage from '@/images/default-img.png';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';

export default function RestaurantSlider({ restaurants }) {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [spaceBetween, setSpaceBetween] = useState(20);
  const nextElRef = useRef();
  const prevElRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 551) {
        setSlidesPerView(2);
        setSpaceBetween(5);
      } else if (window.innerWidth < 769) {
        setSlidesPerView(3);
        setSpaceBetween(15);
      } else if (window.innerWidth < 1025) {
        setSlidesPerView(4);
        setSpaceBetween(10);
      } else {
        setSlidesPerView(5);
        setSpaceBetween(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  const swiperConfig = {
    loop: true,
    modules: [Navigation],
    mousewheel: true,
    grabCursor: true,
    navigation: {
      prevEl: prevElRef.current,
      nextEl: nextElRef.current,
    },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = prevElRef.current;
      swiper.params.navigation.nextEl = nextElRef.current;
    },
  };

  return (
    <div className="explore__container container">
      <div className="explore__slider swiper">
        <button className="explore__slider-btn--prev explore__slider-btn" ref={prevElRef}>
          <ArrowBackIosNewIcon />
        </button>
        <button className="explore__slider-btn--next explore__slider-btn" ref={nextElRef}>
          <ArrowForwardIosIcon />
        </button>
        <Swiper
          className="explore__slider-container"
          {...swiperConfig}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          autoHeight={true}
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <Link className="restaurant-card" href={`/r/${restaurant.id}`}>
                <div className="restaurant-card__img">
                  <Image
                    src={restaurant.img ? `${img_endpoint}/${restaurant.img}` : defaultImage.src}
                    alt={restaurant.name}
                    width={200}
                    height={180}
                  />
                </div>
                <div className="restaurant-card__info">
                  <h3 className="restaurant-card__name">{restaurant.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
