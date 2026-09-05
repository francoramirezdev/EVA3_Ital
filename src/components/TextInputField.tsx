import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { getColors, SPACING, TYPOGRAPHY, type ColorScheme } from '../constants/theme';

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  onSubmitEditing?: () => void;
  editable?: boolean;
  colors?: ColorScheme;
}

// A passbook-style field: tracked label, plain text, single underline —
// no boxed border. Used by the login form and the add-transaction sheet.
export const TextInputField = forwardRef<TextInput, TextInputFieldProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      secureTextEntry = false,
      keyboardType = 'default',
      returnKeyType = 'default',
      autoCapitalize = 'sentences',
      autoCorrect = true,
      onSubmitEditing,
      editable = true,
      colors = getColors('light'),
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const styles = createStyles(colors);

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={returnKeyType === 'done' || returnKeyType === 'send'}
          editable={editable}
        />
      </View>
    );
  }
);

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: SPACING.lg,
    },

    label: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },

    input: {
      ...TYPOGRAPHY.body,
      borderBottomWidth: 1.5,
      borderBottomColor: colors.border,
      paddingVertical: SPACING.sm,
      color: colors.ink,
    },

    inputFocused: {
      borderBottomColor: colors.pine,
      borderBottomWidth: 2,
    },
  });
