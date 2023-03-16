import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
import { loginReducer } from '../reducers/loginReducer';
import { ordersReducer } from '../reducers/ordersReducer';

// persist config
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, loginReducer);

// store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    orders: ordersReducer,
  },
  middleware: [thunk],
});

// persistor
const persistor = persistStore(store);

export { store, persistor };
