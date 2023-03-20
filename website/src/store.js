import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './Reducers/categoryReducer';
import { dishesReducer, dishFormReducer } from './Reducers/dishReducer';
import {
  getRestaurantReducer,
  restaurantLoginReducer,
  restaurantRegisterReducer,
  updateRestaurantDetailsReducer,
  updateRestaurantImageReducer,
} from './Reducers/restaurantReducer';
import { statisticsReducer } from './Reducers/statisticsReducer';

const authFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

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
    categories: categoriesReducer,
    dishes: dishesReducer,
    dishForm: dishFormReducer,
    statistics: statisticsReducer,
  },
  preloadedState: initialState,
});

export default store;
