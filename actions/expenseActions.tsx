import BackendCallout from "../services/BackendCallout";
import { API_URL } from "../constants/Config";
import currency from "currency.js";

export const fetchRecentExpenses = () => {
  return (dispatch, getState) => {
    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/reports/recent`,
      getState().account.token
    ).then(data => {
      return dispatch({
        type: "FETCH_RECENT_EXPENSES",
        payload: data.rows
      });
    });
  };
};

export const createExpense = newExpense => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/expenses`, {
      body: newExpense,
      token: getState().account.token
    }).then(responseExpense => {
      return dispatch({
        type: "NEW_EXPENSE",
        payload: responseExpense
      });
    });
  };
};

export const updateExpense = expense => {
  return (dispatch, getState) => {
    return BackendCallout.putToApi(
      `${API_URL}/api/v1/expenses/${expense.id}`,
      expense,
      getState().account.token
    ).then(responseExpense => {
      return dispatch({
        type: "UPDATE_EXPENSE",
        payload: responseExpense
      });
    });
  };
};

export const getExpense = id => {
  return (dispatch, getState) => {
    BackendCallout.getFromApi(
      `${API_URL}/api/v1/expenses/` + id,
      getState().account.token
    ).then(expense => {
      return dispatch({
        type: "GET_EXPENSE",
        payload: expense
      });
    });
  };
};

export const deleteExpense = id => {
  return (dispatch, getState) => {
    return BackendCallout.delete(
      `${API_URL}/api/v1/expenses/` + id,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "DELETE_EXPENSE",
        payload: id
      });
    });
  };
};

export const getMonthly = monthObject => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/reports/monthly`, {
      body: monthObject,
      token: getState().account.token
    }).then(report => {
      report.rows = report.rows.map(each => {
        return { ...each, sum: currency(each.sum) };
      });
      return dispatch({
        type: "GET_MONTHLY",
        payload: report
      });
    });
  };
};

export const changeMonthlyView = monthly => {
  return dispatch => {
    dispatch({
      type: "CHANGE_MONTHLY_VIEW",
      payload: monthly
    });
  };
};

export const getAllMonth = (monthString, targetDate) => {
  return (dispatch, getState) => {
    const lastDayOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0
    );
    const paramsArray = [
      `startDate=${lastDayOfMonth.getFullYear()}-${lastDayOfMonth.getMonth() +
        1}-01`,
      `endDate=${lastDayOfMonth.getFullYear()}-${lastDayOfMonth.getMonth() +
        1}-${lastDayOfMonth.getDate()}`,
        `pageSize=ALL`
    ];

    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/expenses/?` + paramsArray.join("&"),
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "GET_ALL_MONTH",
        payload: {
          monthString,
          expenses: response.expenses
        }
      });
    });
  };
};
