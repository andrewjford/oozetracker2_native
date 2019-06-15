const errorReducer = (state = {
  showError: false,
  errors: [],
}, action) => {
  switch (action.type) {
    case 'NEW_ERROR':
      return {
        ...state,
        showError: true,
        errors: action.payload,
      }
    case 'CLEAR_ERRORS':
      return {
        showError: false,
        errors: [],
      }
    default:
      return state;
  }
}

export default errorReducer;
