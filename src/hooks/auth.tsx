import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
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
  lengthOrphanageInvalid: Array<string>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  ValidOrphanage(idOrphanage: string): Promise<void>;
  DeleteOrphanage(idOrphanage: string): Promise<void>;
  UpdateOrphanage(idOrphanage: string, orphData: FormData): Promise<void>;
  GetListOrphanages(valid: boolean): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [validOrphanage, SetValidOrphanage] = useState<boolean>();
  const [dataOrphanage, SetDataOrphanage] = useState([]);
  const [lengthOrphanageInvalid, SetLenghtOrphanageInvalid] = useState([]);
  const [data, SetData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Happy:token');
    const user = localStorage.getItem('@Happy:user');
    const rememberLog = localStorage.getItem('@Happy:remember');

    if (token && user) {
      // api.defaults.headers.Authorization = `Bearer ${token}`; parou de funcionar

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  useEffect(() => {
    api.get('/orphanages/NotValidOrphanage').then(response => {
      SetLenghtOrphanageInvalid(response.data);
    });
  }, [dataOrphanage]);

  const signIn = useCallback(async ({ email, password, rememberLogin }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    console.log(response.data.user);

    const { token, user } = response.data;

    if (rememberLogin) {
      localStorage.setItem('@Happy:token', token);
      localStorage.setItem('@Happy:user', JSON.stringify(user));
      localStorage.setItem('@Happy:remember', rememberLogin);
    }

    SetData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Happy:token');
    localStorage.removeItem('@Happy:user');

    SetData({} as AuthState);
  }, []);

  const RefreshOrphanageList = useCallback(async () => {
    const response = await api.get('/orphanages');
    SetDataOrphanage(response.data);
  }, []);

  const ValidOrphanage = useCallback(async idOrphanage => {
    await api.post(
      `orphanages/validOrphanage/${idOrphanage}`,
      {
        valid_orphanage: 'true',
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Happy:token')}`,
        },
      },
    );
    RefreshOrphanageList();
    console.log(idOrphanage);
  }, []);

  const UpdateOrphanage = useCallback(async (idOrphanage, orphData) => {
    await api.put(
      `orphanages/${idOrphanage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Happy:token')}`,
        },
      },
      orphData,
    );
  }, []);

  const DeleteOrphanage = useCallback(async idOrphanage => {
    await api.delete(`orphanages/${idOrphanage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@Happy:token')}`,
      },
    });
    RefreshOrphanageList();
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
        ValidOrphanage,
        DeleteOrphanage,
        UpdateOrphanage,
        lengthOrphanageInvalid,
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
