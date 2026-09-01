import React from 'react';
import { LoginScreen } from './src/screens/LoginScreen';
import type { AuthCredentials } from './src/types/index';

export default function App() {
  const handleLoginSuccess = (credentials: AuthCredentials) => {
    // TODO: Integrar con backend, guardar token, navegar a dashboard
    console.log('Login exitoso:', credentials.email);
  };

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}
