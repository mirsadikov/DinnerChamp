import { Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
import Dashboard from './Screens/Dashboard';
import RegisterScreen from './Screens/RegisterScreen';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
