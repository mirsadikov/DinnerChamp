import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { EMPLOYEE_LOGOUT, SET_SELECTED_ORDER } from '../constants.js';

const Header = ({ menuIsOpen, setMenuIsOpen }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!menuIsOpen) dispatch({ type: SET_SELECTED_ORDER });
    setMenuIsOpen((v) => !v);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <Button title="Options" onPress={handleToggle} color="#fff" />
        <Button
          title="Logout"
          color="#fff"
          onPress={() => {
            dispatch({ type: EMPLOYEE_LOGOUT });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff4b00',
    paddingTop: 24,
    shadowColor: '#666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
  headerContainer: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
