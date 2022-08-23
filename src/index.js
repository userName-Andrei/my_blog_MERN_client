import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <CssBaseline/>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
