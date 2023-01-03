import { configureStore } from '@reduxjs/toolkit';
import { restaurantLoginReducer } from './Reducers/restaurantReducer';

const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo') ? JSON.parse(localStorage.getItem('restaurantInfo')) : null;

const initialState = {
  restaurant: { info: restaurantInfoFromStorage },
};

const store = configureStore({
  reducer: {
    restaurant: restaurantLoginReducer,
  },
  preloadedState: initialState,
});

export default store;
