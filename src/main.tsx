import { defineCustomElements } from '@ionic/pwa-elements/loader';

import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'; // Import the i18n configuration
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

defineCustomElements(window);
