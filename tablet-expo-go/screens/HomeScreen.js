import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
import socketServcies from '../config/socket.js';
import OrderCard from '../components/OrderCard.js';

export default function HomeScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socketServcies.initializeSocket();

    socketServcies.on('order:create', (data) => {
      setOrders(data);
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
