import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StyleSheet, FlatList } from 'react-native';
import OrderCard from './OrderCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_ORDER } from '../constants.js';

export default function Dashboard({ setMenuIsOpen, menuIsOpen }) {
  // styles
  const marginLeft = useSharedValue('0%');
  marginLeft.value = menuIsOpen ? '40%' : '0%';

  const listStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      marginLeft: withTiming(marginLeft.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      zIndex: 2,
      paddingHorizontal: 0,
      paddingBottom: 20,
    };
  });
  // end styles

  const dispatch = useDispatch();
  const { orders, selectedOrder } = useSelector((state) => state.orders);

  const handleCardClick = (order) => {
    if (selectedOrder?.id === order.id) setMenuIsOpen(!menuIsOpen);
    else setMenuIsOpen(true);
    dispatch({ type: SET_SELECTED_ORDER, payload: order });
  };

  return (
    <Animated.View
      style={listStyle}
      onTouchStart={() => {
        setMenuIsOpen(false);
      }}
    >
      <FlatList
        horizontal={true}
        style={styles.cardList}
        data={orders}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            isSelected={menuIsOpen && selectedOrder?.id === item.id}
            onPress={() => handleCardClick(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardList: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
