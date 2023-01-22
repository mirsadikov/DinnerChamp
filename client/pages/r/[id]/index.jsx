import axios from '@/config/axios';
import defaultImage from '@/images/default-img.png';
import { img_endpoint } from '@/config/variables';
import RestaurantProfile from '@/components/dashboard/RestaurantProfile';
import Dishes from '@/components/dashboard/Dishes';
import Cart from '@/components/dashboard/Cart';
import { useRef } from 'react';

export default function R({ dishesData, restaurantData }) {
  const sidebarRef = useRef(null);

  return (
    <div className="restaurant-page">
      <div className="container restaurant-page__container">
        <div className="dishes-list">
          <Dishes dishesData={dishesData} />
        </div>
        <div className="restaurant-page__sidebar" ref={sidebarRef}>
          <RestaurantProfile restaurantData={restaurantData} />
          <Cart parentRef={sidebarRef} restaurantId={restaurantData.restaurant.id} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let dishes = {};
  let restaurant = {};
  try {
    dishes.data = (await axios.get('/api/dish/' + params.id)).data;
  } catch (error) {
    dishes.error = error;
  }

  try {
    restaurant.data = (await axios.get('/api/restaurant/' + params.id)).data;
  } catch (error) {
    restaurant.error = error;
  }

  return {
    props: {
      dishesData: {
        ...dishes,
        dishes: dishes.data
          ? dishes.data.map((dish) => ({
              ...dish,
              img: dish.image ? `${img_endpoint}/${dish.image}` : defaultImage.src,
            }))
          : [],
      },
      restaurantData: {
        ...restaurant,
        restaurant: restaurant.data
          ? {
              ...restaurant.data,
              img: restaurant.data.img
                ? `${img_endpoint}/${restaurant.data.img}`
                : defaultImage.src,
            }
          : {},
      },
    },
  };
}
