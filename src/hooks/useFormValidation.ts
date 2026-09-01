import { useState } from 'react';

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (fieldName: string, value: string, rules: ValidationRule[]): boolean => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        setErrors(prev => ({ ...prev, [fieldName]: rule.message }));
        return false;
      }
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  };

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    clearError,
    setErrors,
  };
};

// Validadores comunes
export const validators = {
  required: (message = 'Este campo es requerido'): ValidationRule => ({
    validate: (value: string) => value.trim().length > 0,
    message,
  }),

  email: (message = 'Email inválido'): ValidationRule => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length >= length,
    message: message || `Mínimo ${length} caracteres`,
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length <= length,
    message: message || `Máximo ${length} caracteres`,
  }),

  password: (message = 'Contraseña muy débil'): ValidationRule => ({
    validate: (value: string) => {
      return value.length >= 6 && /[a-z]/.test(value) && /[A-Z]/.test(value);
    },
    message,
  }),
};
