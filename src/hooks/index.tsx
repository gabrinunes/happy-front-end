import React from 'react';

import { AuthProvider } from './auth';
import { GeoLocationProvider } from './geolocation';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <GeoLocationProvider>{children}</GeoLocationProvider>
    </AuthProvider>
  );
};

export default AppProvider;
