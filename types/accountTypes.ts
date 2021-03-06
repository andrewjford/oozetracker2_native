import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { LoginFormState } from "./formTypes";
import { Action } from "redux";
import { SignupFormState } from "../components/SignupForm";

export type ThunkFuncPromise = (
  dispatch,
  getState
) => Promise<StandardThunkDispatch>;
export type StandardThunkResult<R> = ThunkAction<R, any, any, Action>;
export type StandardThunkDispatch = ThunkDispatch<any, any, Action>;

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
  (account: LoginFormState): StandardThunkResult<any>;
}

export interface UpdateActionCreator {
  (updatedAccount: ChangePasswordState): StandardThunkResult<any>;
}

export interface RegisterActionCreator {
  (form: SignupFormState): StandardThunkResult<any>;
}

export interface GetDetailsActionCreator {
  (): StandardThunkResult<any>;
}

export interface SetTokenAction {
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

export interface ChangePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  errors: string[];
  updated: boolean;
}
