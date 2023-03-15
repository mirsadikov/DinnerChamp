import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useSelector } from 'react-redux';
import socketServcies from '../config/socket.js';
import OrderCard from '../components/OrderCard.js';

export default function HomeScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    socketServcies.initializeSocket(token);

    socketServcies.on('order:read', (data) => {
      setOrders(data);
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <ScrollView style={styles.scrollView}> */}
      <FlatList
        horizontal={true}
        style={styles.cardList}
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  text: {
    fontSize: 40,
  },
  cardList: {
    marginBottom: 20,
  },
});
