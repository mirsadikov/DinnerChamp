import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useDispatch, useSelector } from 'react-redux';
import { RESTAURANT_SET_STATUS, SET_ORDERS, UPDATE_ORDER } from '../constants.js';
import socketServcies from '../config/socket.js';
import ControlMenu from '../components/ControlMenu.js';
import Dashboard from '../components/Dashboard.js';
import Header from '../components/Header.js';

export default function HomeScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.employee);

  useEffect(() => {
    socketServcies.initializeSocket(token);

    socketServcies.on('order:read', (data) => {
      dispatch({ type: SET_ORDERS, payload: data });
    });

    socketServcies.on('order:update', (updatedOrder) => {
      dispatch({ type: UPDATE_ORDER, payload: updatedOrder });
    });

    socketServcies.on('restaurant:read', (status) => {
      dispatch({ type: RESTAURANT_SET_STATUS, payload: status.running });
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
      <View style={{ flex: 1 }}>
        <ControlMenu setIsOpen={setMenuIsOpen} isOpen={menuIsOpen} />
        <Dashboard setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
