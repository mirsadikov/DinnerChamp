import { configureStore } from '@reduxjs/toolkit';
import {
  getRestaurantReducer,
  restaurantLoginReducer,
  restaurantRegisterReducer,
  updateRestaurantDetailsReducer,
  updateRestaurantImageReducer,
} from './Reducers/restaurantReducer';

const authFromStorage = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;

const initialState = {
  auth: { info: authFromStorage },
};

const store = configureStore({
  reducer: {
    auth: restaurantLoginReducer,
    restaurantRegister: restaurantRegisterReducer,
    details: getRestaurantReducer,
    updateImage: updateRestaurantImageReducer,
    updateDetails: updateRestaurantDetailsReducer,
  },
  preloadedState: initialState,
});

export default store;
