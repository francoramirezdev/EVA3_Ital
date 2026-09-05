import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { getColors, SPACING, TYPOGRAPHY, RADIUS, FONT_FAMILY, type ColorScheme } from '../constants/theme';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { useTransactions } from '../hooks/useTransactions';
import { Button } from '../components/Button';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { formatCLP, formatSignedCLP } from '../utils';
import type { User } from '../hooks/useAuth';

interface HomeScreenProps {
  user: User | null;
  onLogout: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onLogout }) => {
  const { isWeb: isWebScreen, width } = useResponsive();
  const { mode, toggleTheme } = useTheme();
  const colors = getColors(mode);
  const styles = createStyles(colors);
  const maxWidth = isWebScreen ? 600 : width;
  const cardWidth = (maxWidth - SPACING.lg * 2 - SPACING.sm) / 2;

  const { transactions, addTransaction, deleteTransaction, groupByMonth, totals, balance } =
    useTransactions();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const groupedTransactions = groupByMonth();
  const allTransactions = groupedTransactions.flatMap(([_, items]) => items);
  const entryNumber = String(transactions.length).padStart(4, '0');

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>¡Bienvenido,</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} activeOpacity={0.7}>
            <Text style={styles.themeIcon}>{mode === 'light' ? '🌙' : '☀️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { width: cardWidth, borderLeftColor: colors.pine }]}>
            <Text style={styles.statIcon}>📈</Text>
            <Text style={styles.statValue}>{formatCLP(totals.income)}</Text>
            <Text style={styles.statLabel}>Ingresos</Text>
          </View>

          <View style={[styles.statCard, { width: cardWidth, borderLeftColor: colors.rust }]}>
            <Text style={styles.statIcon}>📉</Text>
            <Text style={styles.statValue}>{formatCLP(totals.expense)}</Text>
            <Text style={styles.statLabel}>Gastos</Text>
          </View>
        </View>

        {/* Balance — the ledger stub */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <Text style={styles.balanceAmount}>{formatCLP(balance)}</Text>
          <View style={styles.perforation} />
          <View style={styles.stubFooter}>
            <Text style={styles.stubText}>Actualizado hoy</Text>
            <Text style={styles.stubNumber}>N.º {entryNumber}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <View style={{ flex: 1 }}>
            <Button label="+ Gasto" onPress={() => setShowExpenseModal(true)} variant="danger" size="medium" />
          </View>
          <View style={{ flex: 1 }}>
            <Button label="+ Ingreso" onPress={() => setShowIncomeModal(true)} variant="primary" size="medium" />
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transacciones</Text>

          <View style={styles.ledgerSheet}>
            {allTransactions.length === 0 ? (
              <Text style={styles.emptyText}>Aún no hay movimientos.</Text>
            ) : (
              allTransactions.map((transaction, index) => (
                <TransactionRow
                  key={transaction.id}
                  label={transaction.label}
                  category={transaction.category}
                  amount={formatSignedCLP(transaction.amount, transaction.isExpense)}
                  isExpense={transaction.isExpense}
                  colors={colors}
                  showDivider={index > 0}
                  onDelete={() => deleteTransaction(transaction.id)}
                />
              ))
            )}
          </View>
        </View>

        {/* Logout */}
        <Button label="Cerrar sesión" onPress={onLogout} variant="secondary" size="medium" />
      </ScrollView>

      {/* Modals */}
      <AddTransactionModal
        visible={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onAdd={addTransaction}
        isExpense={true}
        colors={colors}
      />
      <AddTransactionModal
        visible={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onAdd={addTransaction}
        isExpense={false}
        colors={colors}
      />
    </View>
  );
};

interface TransactionRowProps {
  label: string;
  category: string;
  amount: string;
  isExpense: boolean;
  colors: ColorScheme;
  showDivider: boolean;
  onDelete: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  label,
  category,
  amount,
  isExpense,
  colors,
  showDivider,
  onDelete,
}) => {
  const styles = createStyles(colors);
  const accent = isExpense ? colors.rust : colors.pine;

  return (
    <View style={[styles.row, showDivider && styles.rowDivider]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.rowContent}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel} numberOfLines={1} ellipsizeMode="tail">
            {label}
          </Text>
          <Text style={styles.rowCategory} numberOfLines={1} ellipsizeMode="tail">
            {category}
          </Text>
        </View>
        <Text style={[styles.rowAmount, { color: accent }]}>{amount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onDelete}
        style={styles.deleteButton}
        activeOpacity={0.6}
        accessibilityLabel="Eliminar transacción"
      >
        <Text style={[styles.deleteIcon, { color: colors.rust }]}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },

    scrollContent: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.xl,
      alignItems: 'stretch',
      alignSelf: 'center',
      width: '100%',
      maxWidth: 650,
    },

    // Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },

    headerContent: {
      flex: 1,
    },

    greeting: {
      ...TYPOGRAPHY.caption,
      color: colors.textMuted,
      marginBottom: SPACING.xs,
    },

    userName: {
      ...TYPOGRAPHY.heading,
      color: colors.ink,
    },

    themeToggle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },

    themeIcon: {
      fontSize: 20,
    },

    // Stats — tickets with a colored spine, not full pastel fills
    statsContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
      marginBottom: SPACING.xl,
    },

    statCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.lg,
      borderLeftWidth: 3,
      padding: SPACING.md,
    },

    statIcon: {
      fontSize: 22,
      marginBottom: SPACING.sm,
    },

    statValue: {
      ...TYPOGRAPHY.figure,
      fontSize: 18,
      color: colors.ink,
      marginBottom: SPACING.xs,
    },

    statLabel: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.textMuted,
    },

    // Balance ledger stub — the signature element
    balanceCard: {
      backgroundColor: colors.stamp,
      borderRadius: RADIUS.xl,
      borderTopWidth: 3,
      borderTopColor: colors.brass,
      padding: SPACING.lg,
      marginBottom: SPACING.xl,
    },

    balanceLabel: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.brass,
      marginBottom: SPACING.sm,
    },

    balanceAmount: {
      fontFamily: FONT_FAMILY.monoBold,
      fontSize: 44,
      color: colors.stampText,
      marginBottom: SPACING.md,
    },

    perforation: {
      borderTopWidth: 1.5,
      borderStyle: 'dashed',
      borderTopColor: 'rgba(251, 250, 246, 0.25)',
      marginBottom: SPACING.md,
    },

    stubFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    stubText: {
      ...TYPOGRAPHY.caption,
      color: 'rgba(251, 250, 246, 0.6)',
    },

    stubNumber: {
      fontFamily: FONT_FAMILY.mono,
      fontSize: 13,
      color: colors.brass,
    },

    // Section
    section: {
      marginBottom: SPACING.xl,
    },

    sectionTitle: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },

    // Transactions — one continuous ledger sheet, hairline rows
    ledgerSheet: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.lg,
      paddingHorizontal: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
    },

    emptyText: {
      ...TYPOGRAPHY.body,
      color: colors.textMuted,
      paddingVertical: SPACING.lg,
      textAlign: 'center',
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },

    rowDivider: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },

    rowContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      paddingVertical: SPACING.md,
    },


    rowInfo: {
      flex: 1,
      gap: 2,
    },

    rowLabel: {
      ...TYPOGRAPHY.subheading,
      fontSize: 15,
      color: colors.ink,
    },

    rowCategory: {
      ...TYPOGRAPHY.eyebrow,
      color: colors.textMuted,
    },

    rowAmount: {
      ...TYPOGRAPHY.figure,
    },

    deleteButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.rustTint,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },

    deleteIcon: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 24,
    },

    // Actions
    actionsContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
      marginBottom: SPACING.lg,
    },
  });
