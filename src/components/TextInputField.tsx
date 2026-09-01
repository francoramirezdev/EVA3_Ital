import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'default' | 'done' | 'next' | 'send' | 'search';
  onSubmitEditing?: () => void;
  editable?: boolean;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  returnKeyType = 'default',
  onSubmitEditing,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.neutral.textLight}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={returnKeyType === 'done' || returnKeyType === 'send'}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.lg,
  },

  label: {
    ...TYPOGRAPHY.small,
    color: COLORS.neutral.dark,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.neutral.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.neutral.dark,
    backgroundColor: COLORS.white,
  },

  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});
