import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './config/store';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { HOME_SCREEN, LOGIN_SCREEN } from './constants';
import AuthVerify from './components/AuthVerify';

const Stack = createNativeStackNavigator();

const RootComponent = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <AuthVerify />
      <Stack.Navigator>
        {token ? (
          <Stack.Screen
            name={HOME_SCREEN}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
}
