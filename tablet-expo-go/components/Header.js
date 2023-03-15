import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RESTAURANT_LOGOUT } from '../constants.js';

const Header = ({ menuToggle }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.header}>
      <Button title="Options" onPress={menuToggle} />
      <Button
        title="Logout"
        onPress={() => {
          dispatch({ type: RESTAURANT_LOGOUT });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default Header;
