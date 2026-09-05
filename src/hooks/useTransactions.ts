import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ital-app/transactions';

export interface Transaction {
  id: string;
  amount: number;
  label: string;
  category: string;
  icon: string;
  isExpense: boolean;
  date: Date;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 25000,
      label: 'Almuerzo',
      category: 'Comida',
      icon: '🍔',
      isExpense: true,
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      id: '2',
      amount: 2450000,
      label: 'Salario',
      category: 'Ingresos',
      icon: '💼',
      isExpense: false,
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
    {
      id: '3',
      amount: 12500,
      label: 'Uber',
      category: 'Transporte',
      icon: '🚕',
      isExpense: true,
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      id: '4',
      amount: 15990,
      label: 'Netflix',
      category: 'Entretenimiento',
      icon: '🎬',
      isExpense: true,
      date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  ]);

  const loadedRef = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        const parsed: Transaction[] = JSON.parse(raw).map((t: Transaction) => ({
          ...t,
          date: new Date(t.date),
        }));
        setTransactions(parsed);
      }
      loadedRef.current = true;
    });
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.isExpense) {
        acc.expense += t.amount;
      } else {
        acc.income += t.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;
  const groupByMonth = (): Array<[string, Transaction[]]> => {
    const grouped: { [key: string]: Transaction[] } = {};

    transactions.forEach(transaction => {
      const month = transaction.date.toLocaleString('es-ES', {
        month: 'long',
        year: 'numeric',
      });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(transaction);
    });

    // Ordenar transacciones dentro de cada mes por fecha descendente
    Object.keys(grouped).forEach(month => {
      grouped[month].sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    // Retornar como array ordenado por fecha más reciente primero
    return Object.entries(grouped).sort(
      ([, a], [, b]) => {
        const dateA = a[0]?.date.getTime() || 0;
        const dateB = b[0]?.date.getTime() || 0;
        return dateB - dateA;
      }
    );
  };

  return { transactions, addTransaction, deleteTransaction, groupByMonth, totals, balance };
};
