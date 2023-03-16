import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ORDERS, UPDATE_ORDER } from '../constants.js';
import socketServcies from '../config/socket.js';
import ControlMenu from '../components/ControlMenu.js';
import Dashboard from '../components/Dashboard.js';

export default function HomeScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    socketServcies.initializeSocket(token);

    socketServcies.on('order:read', (data) => {
      dispatch({ type: SET_ORDERS, payload: data });
    });

    socketServcies.on('order:update', (updatedOrder) => {
      dispatch({ type: UPDATE_ORDER, payload: updatedOrder });
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ControlMenu setIsOpen={setMenuIsOpen} isOpen={menuIsOpen} />
      <Dashboard setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24,
  },
});
