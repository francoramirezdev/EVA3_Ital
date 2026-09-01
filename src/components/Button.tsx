import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  size = 'medium',
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${variant}Button`],
        styles[`${size}Size`],
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'secondary' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Variants
  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  dangerButton: {
    backgroundColor: COLORS.danger,
  },

  // Sizes
  smallSize: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },

  mediumSize: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },

  largeSize: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    minHeight: 52,
  },

  // Text variants
  buttonText: {
    ...TYPOGRAPHY.subheading,
    textAlign: 'center',
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryText: {
    color: COLORS.primary,
  },

  dangerText: {
    color: COLORS.white,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});
