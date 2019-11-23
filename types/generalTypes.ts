import { AccountState } from "./accountTypes";
import { ExpenseState } from "./expenseTypes";
import { CategoryState } from "./categoryTypes";

export interface rootState {
  account: AccountState;
  expenses: ExpenseState;
  categories: CategoryState;
}
