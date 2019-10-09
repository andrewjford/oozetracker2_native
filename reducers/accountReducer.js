const accountReducer = (
  state = {
    token: null
  },
  action
) => {
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
    case "REMOVE_TOKEN":
      const { token, ...rest } = state;
      return {
        ...rest
      };
    default:
      return state;
  }
};

export default accountReducer;
