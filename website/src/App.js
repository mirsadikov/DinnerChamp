import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/auth" element={<AuthScreen />} />
    </Routes>
  );
}

export default App;
