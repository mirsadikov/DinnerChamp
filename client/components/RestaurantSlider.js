import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function RestaurantSlider({ restaurants }) {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [spaceBetween, setSpaceBetween] = useState(20);
  const nextElRef = useRef();
  const prevElRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setSlidesPerView(2);
        setSpaceBetween(20);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(3);
        setSpaceBetween(20);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(4);
        setSpaceBetween(20);
      } else {
        setSlidesPerView(5);
        setSpaceBetween(20);
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
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <div className="restaurant-card">
                <div className="restaurant-card__img">
                  <img src={restaurant.img} alt={restaurant.name} />
                </div>
                <div className="restaurant-card__info">
                  <h3 className="restaurant-card__name">{restaurant.name}</h3>
                  <p className="reastaurant-card__city">{restaurant.city}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
