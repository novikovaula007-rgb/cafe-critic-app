import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CssBaseline} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <CssBaseline/>
          <App/>
          <ToastContainer/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);