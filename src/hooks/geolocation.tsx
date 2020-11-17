import React, { createContext, useState, useCallback, useContext } from 'react';
import Axios from 'axios';

interface Location {
  latitude: number;
  longitude: number;
  cidade: string;
  estado: string;
}

interface GeoLocationContextData {
  location: Location | undefined;
  getLocation(): void;
}

const GeoLocationContext = createContext<GeoLocationContextData>(
  {} as GeoLocationContextData,
);

export const GeoLocationProvider: React.FC = ({ children }) => {
  const [location, SetLocation] = useState<Location>();

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(showLocation);
  }, []);

  const showLocation = useCallback(async position => {
    console.log('posição', position.coords.latitude);
    const response = await Axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=br`,
    );
    SetLocation({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      estado: response.data.principalSubdivision,
      cidade: response.data.city,
    });
  }, []);

  return (
    <GeoLocationContext.Provider value={{ location, getLocation }}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export function useGeoLocation(): GeoLocationContextData {
  const context = useContext(GeoLocationContext);

  if (!context) {
    throw new Error('Erro ');
  }
  return context;
}
export default GeoLocationContext;
