import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { useAuth, ThemeProvider } from './src/hooks';
import { FONTS_TO_LOAD } from './src/constants/theme';
import type { AuthCredentials } from './src/types/index';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [fontsLoaded] = useFonts(FONTS_TO_LOAD);
  const [authError, setAuthError] = useState<string | null>(null);
  const { isAuthenticated, user, loading, restoring, login, register, logout } = useAuth();

  const handleLoginSubmit = async (credentials: AuthCredentials) => {
    setAuthError(null);
    const success = await login(credentials.email, credentials.password);

    if (!success) {
      setAuthError('Email o contraseña incorrectos');
    }
  };

  const handleRegisterSubmit = async (credentials: AuthCredentials) => {
    setAuthError(null);
    if (!credentials.name) {
      setAuthError('El nombre es requerido');
      return;
    }
    
    const success = await register(credentials.name, credentials.email, credentials.password);

    if (!success) {
      setAuthError('Hubo un error al registrarse');
    }
  };

  if (restoring || !fontsLoaded) {
    return null;
  }

  if (isAuthenticated && user) {
    return <HomeScreen user={user} onLogout={logout} />;
  }

  return (
    <LoginScreen
      onLoginSuccess={handleLoginSubmit}
      onRegisterSuccess={handleRegisterSubmit}
      loading={loading}
      error={authError}
    />
  );
}
