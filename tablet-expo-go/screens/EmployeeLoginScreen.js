import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { employeeLogin } from '../actions/login';
import { RESET_ERRORS } from '../constants';

export default function EmployeeLoginScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.employee);

  const handleLogin = () => {
    dispatch(employeeLogin(employeeId, password));
  };

  // reset error when component unmounts
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ERRORS });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ID"
            onChangeText={(id) => setEmployeeId(id)}
            value={employeeId}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
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
