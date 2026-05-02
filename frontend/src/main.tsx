import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer />
          <CssBaseline />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
