import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function OrderCard({ order }) {
  return (
    <View>
      <View style={styles.card}>
        <Text style={[styles.textBlack, styles.title]}>{order.ordererName}</Text>
        <Text style={styles.textBlack}>{order.ordererPhone}</Text>
        <Text style={styles.textBlack}>{new Date(order.createdAt).toLocaleTimeString()}</Text>
        <View
          style={styles.divider}
        />
        {order.orderDishes.map((orderDish) => (
          <View key={orderDish.id} style={styles.dishRow}>
            <Text style={[styles.quantity, styles.textBlack]}>{orderDish.quantity}x</Text>
            <Text style={[styles.dishName, styles.textBlack]}>{orderDish.dishName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  dishRow: {
    flexDirection: 'row',
    width: '100%',
  },
  quantity: {
    marginRight: 10,
  },
  textBlack: {
    color: '#222',
  },
});
