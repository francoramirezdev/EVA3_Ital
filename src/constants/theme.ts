import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Design tokens
export const COLORS = {
  primary: '#10b981', // Emerald verde confianza financiera
  primaryDark: '#059669',
  primaryLight: '#d1fae5',

  secondary: '#0369a1', // Azul complementario

  neutral: {
    dark: '#1f2937',
    light: '#f9fafb',
    border: '#e5e7eb',
    text: '#374151',
    textLight: '#6b7280',
  },

  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',

  white: '#ffffff',
  black: '#000000',
};

export const TYPOGRAPHY = {
  display: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const styles = StyleSheet.create({
  // Layout base
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.light,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Gradient bg
  gradientBg: {
    flex: 1,
  },

  // Contenedores
  screen: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  // Typography
  displayText: {
    ...TYPOGRAPHY.display,
    color: COLORS.neutral.dark,
  },

  headingText: {
    ...TYPOGRAPHY.heading,
    color: COLORS.neutral.dark,
  },

  bodyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.neutral.text,
  },

  captionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral.textLight,
  },

  // Inputs
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.neutral.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginVertical: SPACING.sm,
    fontSize: 16,
    color: COLORS.neutral.dark,
    backgroundColor: COLORS.white,
  },

  textInputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  // Botones
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },

  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },

  buttonPrimaryPressed: {
    backgroundColor: COLORS.primaryDark,
  },

  buttonText: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.white,
    textAlign: 'center',
  },

  buttonSecondaryText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    textAlign: 'center',
  },
});
