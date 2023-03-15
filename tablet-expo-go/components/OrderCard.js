import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function OrderCard({ order }) {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.title}>{order.ordererName}</Text>
        <Text>{order.ordererPhone}</Text>
        <Text>{new Date(order.createdAt).toLocaleTimeString()}</Text>
        <View style={styles.divider} />
        {order.orderDishes.map((orderDish) => (
          <View key={orderDish.id} style={styles.dishRow}>
            <Text style={styles.quantity}>{orderDish.quantity}x</Text>
            <Text style={styles.dishName}>{orderDish.dishName}</Text>
          </View>
        ))}
        {order.comment && (
          <>
            <View style={styles.divider} />
            <View style={styles.commentBox}>
              <Text style={styles.commentTitle}>Comment:</Text>
              <Text>{order.comment}</Text>
            </View>
          </>
        )}
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
    alignItems: 'center',
  },
  quantity: {
    marginRight: 10,
  },
  dishName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentBox: {
    width: '100%',
  },
  commentTitle: {
    fontWeight: '600',
  },
});
