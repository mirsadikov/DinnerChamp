import NetInfo from '@react-native-community/netinfo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ControlMenu from '../components/ControlMenu.js';
import Dashboard from '../components/Dashboard.js';
import Header from '../components/Header.js';
import socketServcies from '../config/socket.js';
import { RESTAURANT_SET_STATUS, SET_ORDERS, UPDATE_ORDER } from '../constants.js';

export default function HomeScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.employee);

  useEffect(() => {
    // network listener
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setConnectionStatus('Connecting...');
        // socket connection
        socketServcies.initializeSocket(token, (status) => setConnectionStatus(status));

        socketServcies.on('order:read', (data) => {
          dispatch({ type: SET_ORDERS, payload: data });
        });

        socketServcies.on('order:update', (updatedOrder) => {
          dispatch({ type: UPDATE_ORDER, payload: updatedOrder });
        });

        socketServcies.on('branch:read', (status) => {
          dispatch({ type: RESTAURANT_SET_STATUS, payload: status.running });
        });
      } else {
        setConnectionStatus('Disconnected');
        socketServcies.disconnect();
      }
    });

    return () => {
      unsubscribe();
      socketServcies.disconnect();
    };
  }, [dispatch, token]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header connectionStatus={connectionStatus} />
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
