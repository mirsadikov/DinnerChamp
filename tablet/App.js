import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import socketServcies from './socket';
import OrderCard from './src/components/OrderCard';

export default function App() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    socketServcies.initializeSocket();

    socketServcies.on('order:create', (data) => {
      console.log('order', data);
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
    marginTop: 30,
  },
  text: {
    fontSize: 40,
  },
  cardList: {
    marginBottom: 20,
  },
});
