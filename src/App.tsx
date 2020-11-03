/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import AppProvider from './hooks';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
