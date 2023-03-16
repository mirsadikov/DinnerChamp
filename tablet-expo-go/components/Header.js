import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RESTAURANT_LOGOUT, SET_SELECTED_ORDER } from '../constants.js';

const Header = ({ menuIsOpen, setMenuIsOpen }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!menuIsOpen) dispatch({ type: SET_SELECTED_ORDER });
    setMenuIsOpen((v) => !v);
  };

  return (
    <View style={styles.header}>
      <Button title="Options" onPress={handleToggle} />
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
