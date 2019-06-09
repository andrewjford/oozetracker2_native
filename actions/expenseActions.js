import BackendCallout from '../services/BackendCallout';
import { API_URL } from '../constants/Config';
import currency from 'currency.js';
import ErrorHandling from '../services/ErrorHandling';

export const fetchRecentExpenses = () => {
  return (dispatch, getState) => {
    return BackendCallout.getFromApi(`${API_URL}/api/v1/reports/recent`, getState().account.token)
      .then(data => {
        return dispatch({
          type: 'FETCH_RECENT_EXPENSES',
          payload: data.rows
        });
      })
      .catch(error => {
        return dispatch({
          type: 'NEW_ERROR',
          payload: ErrorHandling.toErrorArray(error),
        })
      });;
  }
}

export const createExpense = (newExpense) => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/expenses`, newExpense, getState().account.token)
      .then((responseExpense) => {
        return dispatch({
          type: 'NEW_EXPENSE',
          payload: responseExpense,
        })
      })
      .catch(error => {
        return dispatch({
          type: 'NEW_ERROR',
          payload: ErrorHandling.toErrorArray(error),
        })
      });
  }
}

export const updateExpense = (expense) => {
  return (dispatch, getState) => {
    return BackendCallout.putToApi(`${API_URL}/api/v1/expenses/${expense.id}`, expense, getState().account.token)
      .then((responseExpense) => {
        return dispatch({
          type: 'UPDATE_EXPENSE',
          payload: responseExpense,
        })
      })
      .catch(error => {
        return dispatch({
          type: 'NEW_ERROR',
          payload: ErrorHandling.toErrorArray(error),
        })
      });
  }
}

export const getExpense = (id) => {
  return (dispatch, getState) => {
    BackendCallout.getFromApi(`${API_URL}/api/v1/expenses/` + id, getState().account.token)
      .then(expense => {
        return dispatch({
          type: 'GET_EXPENSE',
          payload: expense,
        })
      })
      .catch(error => {
        return dispatch({
          type: 'NEW_ERROR',
          payload: ErrorHandling.toErrorArray(error),
        })
      });
  }
}

export const deleteExpense = (id) => {
  return (dispatch, getState) => {
    return BackendCallout.delete(`${API_URL}/api/v1/expenses/` + id, getState().account.token)
      .then(response => {
        return dispatch({
          type: 'DELETE_EXPENSE',
          payload: id,
        })
      })
      .catch(error => {
        return dispatch({
          type: 'NEW_ERROR',
          payload: ErrorHandling.toErrorArray(error),
        })
      });
  }
}

export const getMonthly = (monthObject) => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/reports/monthly`, monthObject, getState().account.token)
    .then(report => {
      report.rows = report.rows.map((each) => {
        return {...each, sum: currency(each.sum)}
      });
      return dispatch({
        type: 'GET_MONTHLY',
        payload: report,
      });
    })
    .catch(error => {
      return dispatch({
        type: 'NEW_ERROR',
        payload: ErrorHandling.toErrorArray(error),
      });
    });
  }
}

export const changeMonthlyView = (monthly) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_MONTHLY_VIEW',
      payload: monthly,
    })
  }
}