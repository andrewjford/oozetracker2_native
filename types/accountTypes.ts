import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { LoginFormState } from "./formTypes";
import { Action, AnyAction } from "redux";

export type LoginThunkResult<R> = ThunkAction<R, any, any, Action>;
export type LoginThunkDispatch = ThunkDispatch<any, any, Action>;

export interface AccountState {
  token: string;
  email: string;
  name: string;
  id: string;
}

export enum ActionTypes {
  SET_TOKEN = "SET_TOKEN",
  ADD_DETAILS = "ADD_DETAILS",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  PURGE_ACCOUNT = "PURGE_ACCOUNT"
}

export interface LoginActionCreator {
  (account: LoginFormState): Promise<LoginThunkDispatch>;
}

export interface SetTokenAction extends Action {
  type: ActionTypes.SET_TOKEN;
  payload: {
    token: string;
  };
}

export interface AddDetailsAction extends Action {
  type: ActionTypes.ADD_DETAILS;
  payload: {
    email: string;
    name: string;
    id: string;
  };
}

export interface UpdateAccountAction extends Action {
  type: ActionTypes.UPDATE_ACCOUNT;
  payload: any;
}

export interface PurgeAccountAction extends Action {
  type: ActionTypes.PURGE_ACCOUNT;
}

export type AccountAction =
  | SetTokenAction
  | AddDetailsAction
  | UpdateAccountAction
  | PurgeAccountAction;
