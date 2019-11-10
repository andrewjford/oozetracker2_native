import { getFromApi, postToApi, putToApi, deleteFromApi } from "../services/backendCallout";
import { API_URL } from "../constants/Config";

export const fetchCategories = () => {
  return (dispatch, getState) => {
    return getFromApi(
      `${API_URL}/api/v1/categories`,
      getState().account.token
    ).then(data => {
      return dispatch({
        type: "FETCH_CATEGORIES",
        payload: data.rows
      });
    });
  };
};

export const createCategory = newCategory => {
  return (dispatch, getState) => {
    postToApi(`${API_URL}/api/v1/categories`, {
      body: newCategory,
      token: getState().account.token
    }).then(response => {
      return dispatch({
        type: "NEW_CATEGORY",
        payload: response
      });
    });
  };
};

export const updateCategory = categoryToUpdate => {
  return (dispatch, getState) => {
    return putToApi(
      `${API_URL}/api/v1/categories/${categoryToUpdate.id}`,
      categoryToUpdate,
      getState().account.token
    ).then(responseCategory => {
      return dispatch({
        type: "UPDATE_CATEGORY",
        payload: responseCategory
      });
    });
  };
};

export const deleteCategory = categoryToDelete => {
  return (dispatch, getState) => {
    deleteFromApi(
      `${API_URL}/api/v1/categories/${categoryToDelete.id}`,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "DELETE_CATEGORY",
        payload: categoryToDelete.id
      });
    });
  };
};
