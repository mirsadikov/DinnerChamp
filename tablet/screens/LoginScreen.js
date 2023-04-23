import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.restaurant);

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>

        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    maxWidth: 450,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    marginLeft: 5,
    marginBottom: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    fontSize: 20,
    borderRadius: 50,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ff4b00',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    padding: 15,
    color: '#fff',
  },
});
