import { useRef } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import OrderCard from './OrderCard.js';
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
      paddingBottom: 20,
    };
  });
  // end styles

  const listRef = useRef(null);
  const dispatch = useDispatch();
  const { orders, selectedOrder } = useSelector((state) => state.orders);

  const handleCardClick = (order, index) => {
    if (selectedOrder?.id === order.id) setMenuIsOpen(!menuIsOpen);
    else setMenuIsOpen(true);
    dispatch({ type: SET_SELECTED_ORDER, payload: order });
    listRef.current.scrollToIndex({ index, viewPosition: 0.5 });
  };

  return (
    <Animated.View style={listStyle}>
      <FlatList
        horizontal
        style={styles.cardList}
        data={orders}
        ref={listRef}
        renderItem={({ item, index }) => (
          <OrderCard
            order={item}
            isSelected={menuIsOpen && selectedOrder?.id === item.id}
            onPress={() => handleCardClick(item, index)}
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
  },
});
