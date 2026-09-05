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
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { COLORS, SPACING, TYPOGRAPHY, RADIUS, FONT_FAMILY } from '../constants/theme';
import { useResponsive } from '../hooks/useResponsive';
import { TextInputField } from '../components/TextInputField';
import type { LoginFormState, AuthCredentials } from '../types/index';

interface LoginScreenProps {
  onLoginSuccess?: (credentials: AuthCredentials) => void;
  onRegisterSuccess?: (credentials: AuthCredentials) => void;
  loading?: boolean;
  error?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onRegisterSuccess,
  loading: externalLoading = false,
  error: externalError = null,
}) => {
  const { isWeb: isWebScreen } = useResponsive();
  const [formState, setFormState] = useState<LoginFormState>({
    name: '',
    email: '',
    password: '',
    loading: false,
    error: null,
    isRegistering: false,
  });

  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handleNameChange = (text: string) => {
    setFormState(prev => ({ ...prev, name: text, error: null }));
  };

  const handleEmailChange = (text: string) => {
    setFormState(prev => ({ ...prev, email: text, error: null }));
  };

  const handlePasswordChange = (text: string) => {
    setFormState(prev => ({ ...prev, password: text, error: null }));
  };
  
  const toggleMode = () => {
    setFormState(prev => ({
      ...prev,
      isRegistering: !prev.isRegistering,
      error: null,
    }));
  };

  const validateForm = (): boolean => {
    if (formState.isRegistering && !formState.name.trim()) {
      setFormState(prev => ({ ...prev, error: 'Ingresa tu nombre' }));
      return false;
    }

    if (!formState.email.trim()) {
      setFormState(prev => ({ ...prev, error: 'Ingresa tu email' }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Email inválido' }));
      return false;
    }

    if (!formState.password.trim()) {
      setFormState(prev => ({ ...prev, error: 'Ingresa tu contraseña' }));
      return false;
    }

    if (formState.password.length < 6) {
      setFormState(prev => ({ ...prev, error: 'Contraseña mínimo 6 caracteres' }));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const credentials: AuthCredentials = {
      email: formState.email,
      password: formState.password,
      ...(formState.isRegistering ? { name: formState.name } : {}),
    };
    
    if (formState.isRegistering) {
      onRegisterSuccess?.(credentials);
    } else {
      onLoginSuccess?.(credentials);
    }
  };

  const displayError = externalError || formState.error;
  const isLoading = externalLoading || formState.loading;

  return (
    <View style={styles.screenBg}>
      <StatusBar hidden />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {isWebScreen ? (
          <ScrollView
            contentContainerStyle={styles.webScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.webFormWrapper}>
              <FormContent
                formState={formState}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                emailInputRef={emailInputRef}
                passwordInputRef={passwordInputRef}
                handleSubmit={handleSubmit}
                toggleMode={toggleMode}
                displayError={displayError}
                isLoading={isLoading}
              />
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.mobileScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <FormContent
              formState={formState}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              emailInputRef={emailInputRef}
              passwordInputRef={passwordInputRef}
              handleSubmit={handleSubmit}
              toggleMode={toggleMode}
              displayError={displayError}
              isLoading={isLoading}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

interface FormContentProps {
  formState: LoginFormState;
  handleNameChange: (text: string) => void;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  emailInputRef: React.RefObject<TextInput | null>;
  passwordInputRef: React.RefObject<TextInput | null>;
  handleSubmit: () => void;
  toggleMode: () => void;
  displayError: string | null;
  isLoading: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  formState,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  emailInputRef,
  passwordInputRef,
  handleSubmit,
  toggleMode,
  displayError,
  isLoading,
}) => (
  <View style={styles.formContent}>
    {/* Hero */}
    <View style={styles.hero}>
      <View style={styles.seal}>
        <Text style={styles.sealIcon}>💰</Text>
      </View>
      <Text style={styles.wordmark}>Ital</Text>
      <Text style={styles.tagline}>Control inteligente de tus finanzas</Text>
    </View>

    {/* Form */}
    <View style={styles.formPanel}>
      {formState.isRegistering && (
        <TextInputField
          label="Nombre"
          placeholder="Tu nombre completo"
          value={formState.name}
          onChangeText={handleNameChange}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
          editable={!isLoading}
        />
      )}

      <TextInputField
        ref={emailInputRef}
        label="Email"
        placeholder="usuario@ejemplo.com"
        value={formState.email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        editable={!isLoading}
      />

      <TextInputField
        ref={passwordInputRef}
        label="Contraseña"
        placeholder="Mínimo 6 caracteres"
        value={formState.password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        editable={!isLoading}
      />

      {displayError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠ {displayError}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.pineOn} />
        ) : (
          <Text style={styles.loginButtonText}>
            {formState.isRegistering ? 'Registrarse' : 'Iniciar sesión'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          {formState.isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
        </Text>
        <TouchableOpacity disabled={isLoading} onPress={toggleMode}>
          <Text style={styles.signupLink}>
            {formState.isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Footer */}
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Tus datos están protegidos</Text>
      <Text style={styles.footerSubtext}>Política de privacidad</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenBg: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  webScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },

  webFormWrapper: {
    width: '100%',
    maxWidth: 440,
    paddingHorizontal: SPACING.lg,
  },

  mobileScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  formContent: {
    justifyContent: 'center',
  },

  // Hero
  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.stamp,
    borderRadius: RADIUS.xl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },

  seal: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.brass,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  sealIcon: {
    fontSize: 28,
  },

  wordmark: {
    fontFamily: FONT_FAMILY.serifItalic,
    fontSize: 40,
    color: COLORS.stampText,
    marginBottom: SPACING.sm,
  },

  tagline: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(251, 250, 246, 0.7)',
    textAlign: 'center',
  },

  // Form panel
  formPanel: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    marginTop: SPACING.lg,
    padding: SPACING.lg,
  },

  errorContainer: {
    backgroundColor: COLORS.rustTint,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.rust,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
  },

  errorText: {
    ...TYPOGRAPHY.caption,
    fontFamily: FONT_FAMILY.sansSemiBold,
    color: COLORS.ink,
  },

  loginButton: {
    backgroundColor: COLORS.pine,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    minHeight: 52,
  },

  loginButtonText: {
    fontFamily: FONT_FAMILY.sansSemiBold,
    fontSize: 16,
    letterSpacing: 0.2,
    color: COLORS.pineOn,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },

  signupLink: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.sansSemiBold,
    color: COLORS.pine,
  },

  footerContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },

  footerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },

  footerSubtext: {
    ...TYPOGRAPHY.eyebrow,
    color: COLORS.pine,
    marginTop: SPACING.xs,
  },
});
