import { ExpenseState } from "../types/expenseTypes";

const defaultState: ExpenseState = {
  expenses: [],
  monthlies: {
    currentView: null,
    monthlies: []
  },
  byMonth: {}
};

const expenseReducer = (state: ExpenseState = defaultState, action) => {
  switch (action.type) {
    case "FETCH_RECENT_EXPENSES":
      return {
        ...state,
        expenses: action.payload
      };
    case "NEW_EXPENSE":
      const sortedExpenses = [action.payload, ...state.expenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return {
        ...state,
        expenses: sortedExpenses
      };
    case "UPDATE_EXPENSE":
      const updatedExpenses = state.expenses.map(expense => {
        if (expense.id === action.payload.id) {
          return action.payload;
        } else {
          return expense;
        }
      });

      return {
        ...state,
        expenses: updatedExpenses
      };
    case "GET_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case "DELETE_EXPENSE":
      const afterDelete = state.expenses.filter(expense => {
        return expense.id !== action.payload;
      });
      return {
        ...state,
        expenses: afterDelete
      };
    case "GET_MONTHLY":
      const otherMonthlies = state.monthlies.monthlies.filter(monthly => {
        return (
          monthly.month !== action.payload.month ||
          monthly.year !== action.payload.year
        );
      });
      return {
        ...state,
        monthlies: {
          currentView: action.payload,
          monthlies: [...otherMonthlies, action.payload]
        }
      };
    case "CHANGE_MONTHLY_VIEW":
      return {
        ...state,
        monthlies: {
          ...state.monthlies,
          currentView: action.payload
        }
      };
    case "PURGE_EXPENSES":
      return defaultState;
    case "GET_ALL_MONTH":
      return {
        ...state,
        byMonth: {
          ...state.byMonth,
          [action.payload.monthString]: action.payload.expenses
        }
      };
    default:
      return state;
  }
};

export default expenseReducer;
