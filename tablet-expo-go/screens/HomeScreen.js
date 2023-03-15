import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useSelector } from 'react-redux';
import socketServcies from '../config/socket.js';
import OrderCard from '../components/OrderCard.js';
import ControlMenu from '../components/ControlMenu.js';
import Header from '../components/Header.js';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function HomeScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const [orders, setOrders] = useState([]);
  const [controlIsVisible, setControlIsVisible] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const offsetLeft = useSharedValue('-40%');
  const marginLeft = useSharedValue('0%');
  offsetLeft.value = controlIsVisible ? '0%' : '-40%';
  marginLeft.value = controlIsVisible ? '40%' : '0%';

  const menuStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(offsetLeft.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const listStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      marginLeft: withTiming(marginLeft.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      zIndex: 2,
      paddingHorizontal: 0,
    };
  });

  useEffect(() => {
    socketServcies.initializeSocket(token);

    socketServcies.on('order:read', (data) => {
      setOrders(data);
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  const toggleControlMenu = () => {
    setControlIsVisible((v) => !v);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[menuStyle, styles.menu]}>
        <ControlMenu />
      </Animated.View>
      <Animated.View style={listStyle}>
        <Header menuToggle={toggleControlMenu} />
        <FlatList
          horizontal={true}
          style={styles.cardList}
          data={orders}
          renderItem={({ item }) => <OrderCard order={item} />}
          keyExtractor={(item) => item.id}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24,
  },
  menu: {
    position: 'absolute',
    top: 0,
    width: '40%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  cardList: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
