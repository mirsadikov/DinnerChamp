import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import socketServcies from '../config/socket';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ControlMenu = ({ setIsOpen, isOpen }) => {
  // styles
  const offsetLeft = useSharedValue('-40%');
  offsetLeft.value = isOpen ? '0%' : '-40%';
  const menuStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(offsetLeft.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });
  // end styles

  const { selectedOrder } = useSelector((state) => state.orders);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(selectedOrder?.status);
  }, [selectedOrder, isOpen]);

  const handleConfirm = () => {
    if (!selectedOrder) return;
    if (status !== selectedOrder.status)
      socketServcies.emit('order:update', selectedOrder.id, status);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Animated.View style={[menuStyle, styles.menu]}>
      <View style={styles.container}>
        <View style={styles.main}>
          {selectedOrder && (
            <>
              <View style={styles.orderInfo}>
                <Text style={styles.orderInfoId}>#{selectedOrder.id}</Text>
                <Text style={styles.orderInfoName}>{selectedOrder.ordererName}</Text>
              </View>
              <View style={styles.statusButtons}>
                <TouchableWithoutFeedback
                  style={styles.statusButtonPress}
                  onPress={() => setStatus('pending')}
                >
                  <View style={[styles.statusButton, status === 'pending' && styles.statusPending]}>
                    <Text style={styles.statusButtonText}>Pending</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={styles.statusButtonPress}
                  onPress={() => setStatus('preparing')}
                >
                  <View
                    style={[styles.statusButton, status === 'preparing' && styles.statusPreparing]}
                  >
                    <Text style={styles.statusButtonText}>Preparing</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={styles.statusButtonPress}
                  onPress={() => setStatus('ready')}
                >
                  <View style={[styles.statusButton, status === 'ready' && styles.statusReady]}>
                    <Text style={styles.statusButtonText}>Ready</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </>
          )}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={closeMenu}
            style={styles.bottomButtonPress}
          >
            <Text style={styles.bottomButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={styles.bottomButtonPress}>
            <Text style={styles.bottomButtonText}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleConfirm}
            style={styles.bottomButtonPress}
          >
            <Text style={styles.bottomButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    width: '40%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#83868726',
    backgroundColor: '#f0f8ff',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bottomBar: {
    height: 100,
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderColor: '#83868726',
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoId: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  orderInfoName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomButtonPress: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#83868766',
  },
  bottomButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',
  },
  statusButton: {
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#83868726',
    flex: 1,
    height: 80,
  },
  statusButtonPress: {
    borderRadius: 50,
  },
  statusButtonText: {
    fontSize: 18,
  },
  statusPending: {
    backgroundColor: '#ffc090',
    borderColor: '#824e00',
  },
  statusPreparing: {
    backgroundColor: '#ffffff',
    borderColor: '#000',
  },
  statusReady: {
    backgroundColor: '#c0ff90',
    borderColor: '#006e0f',
  },
});

export default ControlMenu;
