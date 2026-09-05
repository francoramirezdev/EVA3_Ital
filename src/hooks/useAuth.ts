import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ital-app/session';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Usuario de prueba
const TEST_USER = {
  email: 'test@test.com',
  password: '123456',
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        setState({ isAuthenticated: true, user: JSON.parse(raw), loading: false });
      }
      setRestoring(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));

    // Simular delay de backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validar contra usuario de prueba
    if (email === TEST_USER.email && password === TEST_USER.password) {
      const user: User = {
        id: '1',
        email: TEST_USER.email,
        name: 'Usuario Prueba',
      };
      setState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    }

    setState(prev => ({ ...prev, loading: false }));
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));

    // Simular delay de backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    setState({
      isAuthenticated: true,
      user,
      loading: false,
    });
    
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  return {
    ...state,
    restoring,
    login,
    register,
    logout,
  };
};
