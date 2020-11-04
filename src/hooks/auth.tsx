import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
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
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [remember, SetRemember] = useState(false);
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
    SetRemember(rememberLogin);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
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
