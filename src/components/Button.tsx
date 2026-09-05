import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getColors, RADIUS, SPACING, FONT_FAMILY } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

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
  const { mode } = useTheme();
  const colors = getColors(mode);
  const isDisabled = disabled || loading;

  const fill =
    variant === 'primary'
      ? { backgroundColor: colors.pine, borderWidth: 0 }
      : variant === 'danger'
        ? { backgroundColor: colors.rust, borderWidth: 0 }
        : { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.border };

  const textColor =
    variant === 'primary' ? colors.pineOn : variant === 'danger' ? colors.rustOn : colors.ink;

  return (
    <TouchableOpacity
      style={[styles.button, styles[`${size}Size`], fill, isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]} numberOfLines={1}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  smallSize: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },

  mediumSize: {
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    minHeight: 48,
  },

  largeSize: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    minHeight: 52,
  },

  buttonText: {
    fontFamily: FONT_FAMILY.sansSemiBold,
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  disabled: {
    opacity: 0.5,
  },
});
