import { StyleSheet, Text, View } from 'react-native';

const ControlMenu = () => {
  return (
    <View style={styles.container}>
      <Text>Slide In View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#83868726',
    backgroundColor: '#f0f8ff',
  },
});

export default ControlMenu;
