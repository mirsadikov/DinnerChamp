import axios from '@/config/axios';
import defaultImage from '@/images/default-img.png';
import { img_endpoint } from '@/config/variables';
import RestaurantProfile from '@/components/dashboard/RestaurantProfile';
import Dishes from '@/components/dashboard/Dishes';
import Cart from '@/components/dashboard/Cart';
import { useContext, useEffect } from 'react';
import { Alert } from '@mui/material';
import { GlobalContext } from '@/globalContext';

export default function R({ dishesData, restaurantData, branchesData }) {
  const { setCartIsOpen, setOpenBranches } = useContext(GlobalContext);

  useEffect(() => {
    setOpenBranches(branchesData);
  }, [branchesData, setOpenBranches]);

  useEffect(() => {
    return () => {
      setCartIsOpen(false);
    };
  }, [setCartIsOpen]);

  return (
    <div className="restaurant-page">
      <div className="container restaurant-page__container">
        <div className="dishes-list">
          {branchesData.branches.length === 0 && (
            <Alert className="restaurant-page__closed" severity="error">
              Restaurant is not operating right now!
            </Alert>
          )}
          <Dishes dishesData={dishesData} />
        </div>
        <div className="restaurant-page__sidebar">
          <RestaurantProfile restaurantData={restaurantData} />
          <Cart restaurant={restaurantData.restaurant} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let dishes = {};
  let restaurant = {};
  let branches = {};

  try {
    dishes.dishes = (await axios.get('/api/dish/' + params.id)).data;
  } catch (error) {
    dishes.error = error;
  }

  try {
    restaurant.restaurant = (await axios.get('/api/restaurant/' + params.id)).data;
  } catch (error) {
    restaurant.error = error;
  }

  try {
    branches.branches = (await axios.get('/api/branch/getAllOpen/' + params.id)).data;
  } catch (error) {
    branches.error = error;
  }

  return {
    props: {
      branchesData: branches,
      dishesData: {
        ...dishes,
        dishes: dishes.dishes
          ? dishes.dishes.map((dish) => ({
              ...dish,
              img: dish.image ? `${img_endpoint}/${dish.image}` : defaultImage.src,
            }))
          : [],
      },
      restaurantData: {
        ...restaurant,
        restaurant: restaurant.restaurant
          ? {
              ...restaurant.restaurant,
              img: restaurant.restaurant.img
                ? `${img_endpoint}/${restaurant.restaurant.img}`
                : defaultImage.src,
            }
          : {},
      },
    },
  };
}
