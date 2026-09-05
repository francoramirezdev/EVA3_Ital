import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Button } from './Button';
import { TextInputField } from './TextInputField';
import { SPACING, TYPOGRAPHY, RADIUS, FONT_FAMILY, type ColorScheme } from '../constants/theme';
import type { Transaction } from '../hooks/useTransactions';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  isExpense: boolean;
  colors: ColorScheme;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onAdd,
  isExpense,
  colors,
}) => {
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const accent = isExpense ? colors.rust : colors.pine;
  const styles = createStyles(colors);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleAdd = () => {
    if (amount && label && category) {
      onAdd({
        amount: Number(amount),
        label,
        category,
        isExpense,
        date: new Date(),
      });
      setAmount('');
      setLabel('');
      setCategory('');
      onClose();
    }
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -8 : 0}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <View style={[styles.modalContent, isKeyboardVisible && styles.modalContentWithKeyboard]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>{isExpense ? 'Nuevo gasto' : 'Nuevo ingreso'}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Text style={[styles.closeIcon, { color: colors.ink }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.amountField}>
              <Text style={styles.amountLabel}>Monto (CLP)</Text>
              <View style={styles.amountRow}>
                <Text style={[styles.amountSign, { color: accent }]}>$</Text>
                <TextInput
                  style={[styles.amountInput, { color: accent }]}
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="number-pad"
                  value={amount}
                  onChangeText={value => setAmount(value.replace(/\D/g, ''))}
                />
              </View>
              <View style={[styles.amountRule, { backgroundColor: accent }]} />
            </View>

            <View style={styles.form}>
              <TextInputField
                label="Descripción"
                placeholder="Ej: Almuerzo, Salario"
                value={label}
                onChangeText={setLabel}
                colors={colors}
              />
              <TextInputField
                label="Categoría"
                placeholder="Ej: Comida, Transporte"
                value={category}
                onChangeText={setCategory}
                colors={colors}
              />
            </View>

            <View style={styles.actions}>
              <View style={{ flex: 1 }}>
                <Button label="Cancelar" onPress={handleClose} variant="secondary" size="medium" />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="Agregar"
                  onPress={handleAdd}
                  variant={isExpense ? 'danger' : 'primary'}
                  size="medium"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(15, 26, 22, 0.55)',
    },

    backdrop: {
      flex: 1,
    },

    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: RADIUS.xl,
      borderTopRightRadius: RADIUS.xl,
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.lg,
      paddingBottom: Platform.OS === 'ios' ? 34 : SPACING.xl,
      maxHeight: '85%',
    },

    modalContentWithKeyboard: {
      paddingBottom: SPACING.xs,
    },

    scrollContent: {
      paddingBottom: 0,
    },

    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginBottom: SPACING.md,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },

    title: {
      ...TYPOGRAPHY.heading,
      color: colors.ink,
    },

    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },

    closeIcon: {
      fontSize: 16,
      fontFamily: FONT_FAMILY.sansSemiBold,
    },

    amountField: {
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },

    amountLabel: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },

    amountRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
    },

    amountSign: {
      fontFamily: FONT_FAMILY.monoSemiBold,
      fontSize: 28,
      marginRight: 2,
    },

    amountInput: {
      fontFamily: FONT_FAMILY.monoBold,
      fontSize: 40,
      width: 160,
      padding: 0,
      textAlign: 'center',
    },

    amountRule: {
      width: 64,
      height: 3,
      borderRadius: 2,
      marginTop: SPACING.sm,
    },

    form: {
      marginBottom: SPACING.sm,
    },

    actions: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginTop: SPACING.sm,
      marginBottom: SPACING.xs,
    },
  });
