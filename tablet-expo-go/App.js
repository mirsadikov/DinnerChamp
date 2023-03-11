import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { HOME_SCREEN, LOGIN_SCREEN } from './screens';
import { store } from './config/store';

const Stack = createNativeStackNavigator();

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
          <Stack.Screen
            name={HOME_SCREEN}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
