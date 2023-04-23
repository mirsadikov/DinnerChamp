import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
import { loginReducer, employeeLoginReducer } from '../reducers/loginReducer';
import { ordersReducer } from '../reducers/ordersReducer';

// persist config
const persistConfig = (key) => ({
  key,
  storage: AsyncStorage,
});

// persist reducer
const persistedRestaurantReducer = persistReducer(persistConfig('restaurant'), loginReducer);
const persistedEmployeeReducer = persistReducer(persistConfig('employee'), employeeLoginReducer);

// store
const store = configureStore({
  reducer: {
    restaurant: persistedRestaurantReducer,
    employee: persistedEmployeeReducer,
    orders: ordersReducer,
  },
  middleware: [thunk],
});

// persistor
const persistor = persistStore(store);

export { store, persistor };
