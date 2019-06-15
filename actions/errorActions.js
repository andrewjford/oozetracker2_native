import ErrorHandling from '../services/ErrorHandling';

export const newError = (error) => {
  return (dispatch) => {
    return dispatch({
      type: 'NEW_ERROR',
      payload: ErrorHandling.toErrorArray(error),
    })
  }
}

export const clearErrors = () => {
  return (dispatch) => {
    return dispatch({
      type: 'CLEAR_ERRORS'
    })
  }
}