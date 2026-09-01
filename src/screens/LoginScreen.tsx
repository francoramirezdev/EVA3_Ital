import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { COLORS, SPACING, styles as themeStyles, TYPOGRAPHY } from '../constants/theme';
import type { LoginFormState, AuthCredentials } from '../types/index';

interface LoginScreenProps {
  onLoginSuccess?: (credentials: AuthCredentials) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    loading: false,
    error: null,
  });

  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleEmailChange = (text: string) => {
    setFormState(prev => ({
      ...prev,
      email: text,
      error: null,
    }));
  };

  const handlePasswordChange = (text: string) => {
    setFormState(prev => ({
      ...prev,
      password: text,
      error: null,
    }));
  };

  const validateForm = (): boolean => {
    if (!formState.email.trim()) {
      setFormState(prev => ({
        ...prev,
        error: 'Ingresa tu email',
      }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Email inválido',
      }));
      return false;
    }

    if (!formState.password.trim()) {
      setFormState(prev => ({
        ...prev,
        error: 'Ingresa tu contraseña',
      }));
      return false;
    }

    if (formState.password.length < 6) {
      setFormState(prev => ({
        ...prev,
        error: 'Contraseña mínimo 6 caracteres',
      }));
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setFormState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    // Simulación de login (TODO: integrar con backend real)
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        loading: false,
      }));

      const credentials: AuthCredentials = {
        email: formState.email,
        password: formState.password,
      };

      onLoginSuccess?.(credentials);
    }, 1500);
  };

  return (
    <LinearGradient
      colors={[COLORS.neutral.light, '#f3f4f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={themeStyles.container}
    >
      <StatusBar hidden />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>💰</Text>
          </View>
          <Text style={styles.appName}>Ital</Text>
          <Text style={styles.tagline}>Control inteligente de tus finanzas</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[
                themeStyles.textInput,
                focusedInput === 'email' && themeStyles.textInputFocused,
              ]}
              placeholder="usuario@ejemplo.com"
              placeholderTextColor={COLORS.neutral.textLight}
              value={formState.email}
              onChangeText={handleEmailChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
              editable={!formState.loading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              ref={passwordInputRef}
              style={[
                themeStyles.textInput,
                focusedInput === 'password' && themeStyles.textInputFocused,
              ]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={COLORS.neutral.textLight}
              value={formState.password}
              onChangeText={handlePasswordChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              secureTextEntry={true}
              returnKeyType="send"
              onSubmitEditing={handleLogin}
              blurOnSubmit={true}
              editable={!formState.loading}
            />
          </View>

          {/* Error Message */}
          {formState.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {formState.error}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={[themeStyles.button, themeStyles.buttonPrimary, styles.loginButton]}
            onPress={handleLogin}
            disabled={formState.loading}
            activeOpacity={0.8}
          >
            {formState.loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={themeStyles.buttonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.divider} />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿No tienes cuenta? </Text>
            <TouchableOpacity disabled={formState.loading}>
              <Text style={styles.signupLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Tus datos están protegidos</Text>
          <Text style={styles.footerSubtext}>Política de Privacidad</Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
  },

  headerContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xxl + SPACING.md,
    paddingBottom: SPACING.xl,
  },

  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  logoIcon: {
    fontSize: 32,
  },

  appName: {
    ...TYPOGRAPHY.display,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },

  tagline: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral.textLight,
    textAlign: 'center',
  },

  formContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },

  inputWrapper: {
    marginBottom: SPACING.lg,
  },

  inputLabel: {
    ...TYPOGRAPHY.small,
    color: COLORS.neutral.dark,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },

  errorContainer: {
    backgroundColor: '#fee',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },

  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.danger,
    fontWeight: '600',
  },

  loginButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    height: 52,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.neutral.border,
  },

  dividerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral.textLight,
    marginHorizontal: SPACING.md,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    ...TYPOGRAPHY.body,
    color: COLORS.neutral.text,
  },

  signupLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },

  footerContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },

  footerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral.textLight,
  },

  footerSubtext: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
});
