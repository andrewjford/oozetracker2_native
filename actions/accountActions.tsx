import { AsyncStorage } from "react-native";

import BackendCallout from "../services/BackendCallout";
import { API_URL } from "../constants/Config";
import { PURGE } from "redux-persist";
import { ThunkAction } from "redux-thunk";
import { SetTokenAction, ActionTypes, LoginThunkResult, LoginThunkDispatch } from "../types/accountTypes";
import { LoginFormState } from "../types/formTypes";

export const login = (account: LoginFormState): LoginThunkResult<Promise<LoginThunkDispatch>> => {
  return (dispatch: LoginThunkDispatch): Promise<LoginThunkDispatch> => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/login`, {
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

export const logout = (): ThunkAction<Promise<[void, void]>, {}, {}, any> => {
  return (): Promise<[void, void]> => {
    return Promise.all([
      AsyncStorage.removeItem("token"),
      AsyncStorage.removeItem("expiryDate")
    ]);
  };
};

export const purgeData = (): ThunkAction<void, {}, {}, any> => {
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

export const setTokenFromLocalStorage = (
  token: string
): SetTokenAction => {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: { token }
  };
};

export const register = form => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/register`, {
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

export const getDetails = () => {
  return (dispatch, getState) => {
    return BackendCallout.getFromApi(
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

export const updateAccount = updatedAccount => {
  return (dispatch, getState) => {
    const account = getState().account;
    return BackendCallout.putToApi(
      `${API_URL}/api/v1/accounts/${account.id}`,
      updatedAccount,
      account.token
    ).then(response => {
      return dispatch({
        type: "UPDATE_ACCOUNT",
        payload: response
      });
    });
  };
};
