export interface AccountState {
  token: String;
  email: String;
  name: String;
  id: String;
}

export const enum ActionTypes {
  SET_TOKEN = "SET_TOKEN",
  ADD_DETAILS = "ADD_DETAILS",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  PURGE_ACCOUNT = "PURGE_ACCOUNT"
}

export interface SetTokenAction {
  type: ActionTypes.SET_TOKEN;
  payload: {
    token: String;
  };
}

export interface AddDetailsAction {
  type: ActionTypes.ADD_DETAILS;
  payload: {
    email: String;
    name: String;
    id: String;
  };
}

export interface UpdateAccountAction {
  type: ActionTypes.UPDATE_ACCOUNT;
  payload: any;
}

export interface PurgeAccountAction {
  type: ActionTypes.PURGE_ACCOUNT;
}

export type AccountAction =
  | SetTokenAction
  | AddDetailsAction
  | UpdateAccountAction
  | PurgeAccountAction;
