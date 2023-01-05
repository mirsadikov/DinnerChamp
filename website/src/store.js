import { configureStore } from '@reduxjs/toolkit';
import {
  getRestaurantReducer,
  restaurantLoginReducer,
  restaurantRegisterReducer,
  updateRestaurantDetailsReducer,
  updateRestaurantImageReducer,
} from './Reducers/restaurantReducer';

const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo') ? JSON.parse(localStorage.getItem('restaurantInfo')) : null;

const initialState = {
  restaurant: { info: restaurantInfoFromStorage },
};

const store = configureStore({
  reducer: {
    restaurant: restaurantLoginReducer,
    restaurantRegister: restaurantRegisterReducer,
    details: getRestaurantReducer,
    updateImage: updateRestaurantImageReducer,
    updateDetails: updateRestaurantDetailsReducer,
  },
  preloadedState: initialState,
});

export default store;
