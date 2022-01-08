import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header';
import Routes from './routes';

import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Header />
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
