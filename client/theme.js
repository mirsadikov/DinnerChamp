import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4b00',
      dark: '#e54500',
    },
    secondary: {
      main: '#323c5f',
    },
  },
  typography: {
    fontSize: 25.6,
  },
});

export default theme;
