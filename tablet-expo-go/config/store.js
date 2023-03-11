import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
import { dishesReducer } from '../reducers/dishesReducer';
import { loginReducer } from '../reducers/loginReducer';

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, loginReducer);

// store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    dishes: dishesReducer,
  },
  middleware: [thunk],
});

// persistor
const persistor = persistStore(store);

export { store, persistor };
