import { AsyncStorage } from "react-native";

import { API_URL } from "../constants/Config";
import { PURGE } from "redux-persist";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  SetTokenAction,
  ActionTypes,
  StandardThunkDispatch,
  ThunkFuncPromise,
  UpdateAccountAction,
  ChangePasswordState,
  AccountState
} from "../types/accountTypes";
import { LoginFormState } from "../types/formTypes";
import { Action } from "redux";
import { postToApi, getFromApi, putToApi } from "../services/backendCallout";

export const login = (account: LoginFormState): ThunkFuncPromise => {
  return (dispatch): Promise<StandardThunkDispatch> => {
    return postToApi(`${API_URL}/api/v1/login`, {
      body: account,
      headers: {
        "Client-Type": "mobile"
      }
    }).then(response => {
      const expiryDate = new Date();
      expiryDate.setSeconds(response.tokenExpiration);
      AsyncStorage.setItem("token", response.token);
      AsyncStorage.setItem("expiryDate", JSON.stringify(expiryDate));

      return dispatch({
        type: ActionTypes.SET_TOKEN,
        payload: { token: response.token }
      });
    });
  };
};

export const logout = (): ThunkAction<
  Promise<[void, void]>,
  any,
  any,
  Action
> => {
  return (): Promise<[void, void]> => {
    return Promise.all([
      AsyncStorage.removeItem("token"),
      AsyncStorage.removeItem("expiryDate")
    ]);
  };
};

export const purgeData = (): ThunkAction<void, any, any, Action> => {
  return (dispatch): void => {
    dispatch({
      type: PURGE,
      key: "cashTrackerPersist",
      result: () => null
    });

    dispatch({
      type: "PURGE_ACCOUNT"
    });

    dispatch({
      type: "PURGE_EXPENSES"
    });

    dispatch({
      type: "PURGE_CATEGORIES"
    });
  };
};

export const setTokenFromLocalStorage = (token: string): SetTokenAction => {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: { token }
  };
};

export const register = (form): ThunkFuncPromise => {
  return (dispatch, getState) => {
    return postToApi(`${API_URL}/api/v1/register`, {
      body: form,
      token: getState().account.token
    }).then(response => {
      const expiryDate: Date = new Date();
      expiryDate.setSeconds(response.tokenExpiration);
      AsyncStorage.setItem("token", response.token);
      AsyncStorage.setItem("expiryDate", expiryDate.toString());

      return dispatch({
        type: "SET_TOKEN",
        payload: { token: response.token }
      });
    });
  };
};

export const getDetails = (): ThunkFuncPromise => {
  return (dispatch, getState) => {
    return getFromApi(
      `${API_URL}/api/v1/account`,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "ADD_DETAILS",
        payload: response
      });
    });
  };
};

export const updateAccount = (
  updatedAccount: ChangePasswordState
): ThunkFuncPromise => {
  return (dispatch, getState): Promise<StandardThunkDispatch> => {
    const account: AccountState = getState().account;
    return putToApi(
      `${API_URL}/api/v1/accounts/${account.id}`,
      updatedAccount,
      account.token
    ).then((response): any => {
      return dispatch({
        type: "UPDATE_ACCOUNT",
        payload: response
      });
    });
  };
};
