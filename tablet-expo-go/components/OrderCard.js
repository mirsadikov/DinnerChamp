import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native';

export default function OrderCard({ order, onPress, isSelected }) {
  const cardStatusStyle =
    order.status === 'pending'
      ? { backgroundColor: '#fcddc2' }
      : order.status === 'preparing'
      ? { backgroundColor: '#fff' }
      : { backgroundColor: '#d9ffda' };

  return (
    <View>
      <View
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
      >
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[styles.card, cardStatusStyle, isSelected && styles.selectedCard]}>
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
        </TouchableWithoutFeedback>
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
  selectedCard: {
    borderColor: '#000',
    shadowColor: '#666',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
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
