import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header';
import { ProductsProvider } from './hooks/products';
import { MainRoutes } from './routes';

import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <ProductsProvider>
          <Header />
          <MainRoutes />
        </ProductsProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
