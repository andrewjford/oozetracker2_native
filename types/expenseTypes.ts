export interface ExpenseState {
  expenses: Expense[];
  monthlies: {
    currentView: MonthlyExpenseSummary;
    monthlies: MonthlyExpenseSummary[];
  };
  byMonth: { [key: string]: Expense[] };
}

export interface MonthlyExpenseSummary {
  rows: MonthlyLineItem[];
  rowCount: number;
  month: number;
  year: number;
}

export interface MonthlyLineItem {
  sum: number;
  id: number;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category_id: number;
  date: string;
}
