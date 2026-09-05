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
  const [loginError, setLoginError] = useState<string | null>(null);
  const { isAuthenticated, user, loading, restoring, login, logout } = useAuth();

  const handleLoginSubmit = async (credentials: AuthCredentials) => {
    setLoginError(null);
    const success = await login(credentials.email, credentials.password);

    if (!success) {
      setLoginError('Email o contraseña incorrectos');
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
      loading={loading}
      error={loginError}
    />
  );
}
