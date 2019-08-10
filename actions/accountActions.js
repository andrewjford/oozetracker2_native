import { AsyncStorage } from "react-native";

import BackendCallout from "../services/BackendCallout";
import { API_URL } from "../constants/Config";
import { PURGE } from "redux-persist";

export const login = account => {
  return dispatch => {
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
        type: "SET_TOKEN",
        payload: { token: response.token }
      });
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: PURGE,
      key: "cashTrackerPersist",
      result: () => null
    });

    dispatch({
      type: "PURGE_EXPENSES"
    });

    dispatch({
      type: "PURGE_CATEGORIES"
    });

    return Promise.all([
      AsyncStorage.removeItem("token"),
      AsyncStorage.removeItem("expiryDate")
    ]).then(() => {
      return dispatch({
        type: "REMOVE_TOKEN",
        payload: null
      });
    });
  };
};

export const setTokenFromLocalStorage = token => {
  return {
    type: "SET_TOKEN",
    payload: { token }
  };
};

export const register = form => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/register`, {
      body: form,
      token: getState().account.token
    }).then(response => {
      const expiryDate = new Date();
      expiryDate.setSeconds(response.tokenExpiration);
      AsyncStorage.setItem("token", response.token);
      AsyncStorage.setItem("expiryDate", expiryDate);

      return dispatch({
        type: "SET_TOKEN",
        payload: { token: response.token }
      });
    });
  };
};

export const ping = () => {
  return dispatch => {
    return BackendCallout.getFromApi(`${API_URL}/api/v1/ping`);
  };
};
