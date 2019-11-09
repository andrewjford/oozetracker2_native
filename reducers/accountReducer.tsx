import { AccountState } from "../types/accountTypes";

const DEFAULT_STATE: AccountState = {
  token: null,
  email: null,
  name: null,
  id: null,
}

const accountReducer = (
  state = DEFAULT_STATE,
  action
): AccountState => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token
      };
    case "ADD_DETAILS":
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.id
      };
    case "UPDATE_ACCOUNT":
      return state;
    case "PURGE_ACCOUNT":
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default accountReducer;
