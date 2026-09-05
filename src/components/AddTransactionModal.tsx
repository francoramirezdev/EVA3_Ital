import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
  const accent = isExpense ? colors.rust : colors.pine;
  const styles = createStyles(colors);

  const handleAdd = () => {
    if (amount && label && category) {
      onAdd({
        amount: Number(amount),
        label,
        category,
        icon: isExpense ? '💸' : '💰',
        isExpense,
        date: new Date(),
      });
      setAmount('');
      setLabel('');
      setCategory('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>{isExpense ? 'Nuevo gasto' : 'Nuevo ingreso'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Text style={[styles.closeIcon, { color: colors.ink }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.amountField}>
            <Text style={styles.amountLabel}>Monto (CLP)</Text>
            <View style={styles.amountRow}>
              <Text style={[styles.amountSign, { color: accent }]}>$</Text>
              <TextInput
                style={[styles.amountInput, { color: accent }]}
                placeholder="Ej: 25000"
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
              <Button label="Cancelar" onPress={onClose} variant="secondary" size="medium" />
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
        </View>
      </View>
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

    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: RADIUS.xl,
      borderTopRightRadius: RADIUS.xl,
      padding: SPACING.lg,
      paddingBottom: SPACING.xl,
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
    },
  });
