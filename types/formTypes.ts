import { Category } from "./categoryTypes";

export interface LoginFormState {
  email: string;
  password: string;
}

export interface ExpenseFormState {
  description: string;
  date: Date;
  categoryId: number;
  amount: string;
  errors: string[];
  isLoading: boolean;
}
