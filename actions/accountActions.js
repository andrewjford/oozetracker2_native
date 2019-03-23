import { AsyncStorage } from 'react-native';

import BackendCallout from '../services/BackendCallout';
import { fetchRecentExpenses } from './expenseActions';
import { fetchCategories } from './categoriesActions';
import { API_URL } from '../constants/Config';

export const login = (account) => {
  return (dispatch) => {
    dispatch(loginCallout(account))
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      })
      .catch(error => console.log('login failed'))
  }
}

export const loginCallout = (account) => {
  return (dispatch) => {
    console.log('calling '+`${API_URL}/api/v1/login`);
    console.log('with '+JSON.stringify(account));
    return BackendCallout.postToApi(`${API_URL}/api/v1/login`, account)
      .then(response => {
        console.log('responsess '+JSON.stringify(response));
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('expiryDate', JSON.stringify(expiryDate));

        return dispatch({
          type: 'SET_TOKEN',
          payload: {token: response.token},
        });
      })
      .catch(error => console.log('login callout failed. ' + error.message));
  }
}

export const logout = () => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('expiryDate');

  return (dispatch) => {
    return dispatch({
      type: 'REMOVE_TOKEN',
      payload: null,
    })
  }
}

export const setTokenFromLocalStorage = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: {token},
  }
}

export const setTokenAndFetchData = (token) => {
  return (dispatch) => {
    dispatch(setTokenFromLocalStorage(token));
    dispatch(fetchRecentExpenses())
    dispatch(fetchCategories());
  }
}

export const register = (form) => {
  return (dispatch) => {
    dispatch(registerCallout(form))
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      })
      .catch(error => console.log('register failed'));
  }
}

export const registerCallout = (form) => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi('/api/v1/register', form, getState().account.token)
      .then((response) => {
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('expiryDate', expiryDate);

        return dispatch({
          type: 'SET_TOKEN',
          payload: {token: response.token},
        });
      });
  }
}
