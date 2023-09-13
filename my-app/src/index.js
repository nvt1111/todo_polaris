import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js'
import './index.css';
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";

ReactDOM.render(
  <AppProvider i18n={en}>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
