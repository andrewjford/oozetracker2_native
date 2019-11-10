export interface ExpenseState {
  expenses: Expense[],
  monthlies: {
    currentView: any,
    monthlies: any[]
  },
  byMonth: any
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category_id: string;
  date: Date;
}