const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCLP = (amount: number) => clpFormatter.format(Math.round(amount));

export const formatSignedCLP = (amount: number, isExpense: boolean) =>
  `${isExpense ? '-' : '+'}${formatCLP(amount)}`;
