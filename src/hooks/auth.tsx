import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Orphanage {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  images: {
    id: string;
    url: string;
  };
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
  rememberLogin: boolean;
}

interface AuthContextData {
  user: User;
  orphanage: any;
  validOrphanage: boolean | undefined;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  GetListOrphanages(valid: boolean): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [validOrphanage, SetValidOrphanage] = useState<boolean>();
  const [dataOrphanage, SetDataOrphanage] = useState([]);
  const [data, SetData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Happy:token');
    const user = localStorage.getItem('@Happy:user');
    const rememberLog = localStorage.getItem('@Happy:remember');

    if (token && user && rememberLog === 'true') {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, rememberLogin }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    console.log(response.data.user);

    const { token, user } = response.data;

    localStorage.setItem('@Happy:token', token);
    localStorage.setItem('@Happy:user', JSON.stringify(user));
    localStorage.setItem('@Happy:remember', rememberLogin);

    SetData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    SetData({} as AuthState);
  }, []);

  const GetListOrphanages = useCallback(async valid => {
    if (!valid) {
      const response = await api.get('/orphanages/NotValidOrphanage');
      SetDataOrphanage(response.data);
      SetValidOrphanage(false);
    } else {
      const response = await api.get('/orphanages');
      SetDataOrphanage(response.data);
      SetValidOrphanage(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        GetListOrphanages,
        orphanage: dataOrphanage,
        validOrphanage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
