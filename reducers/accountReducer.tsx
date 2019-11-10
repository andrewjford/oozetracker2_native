import { AccountState, AccountAction, ActionTypes } from "../types/accountTypes";

const DEFAULT_STATE: AccountState = {
  token: null,
  email: null,
  name: null,
  id: null,
}

const accountReducer = (
  state: AccountState = DEFAULT_STATE,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    case ActionTypes.ADD_DETAILS:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.id
      };
    case ActionTypes.UPDATE_ACCOUNT:
      return state;
    case ActionTypes.PURGE_ACCOUNT:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default accountReducer;
