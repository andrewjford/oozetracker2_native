import ErrorHandling from '../services/ErrorHandling';

export const newError = (error) => {
  return (dispatch) => {
    return dispatch({
      type: 'NEW_ERROR',
      payload: ErrorHandling.toErrorArray(error),
    })
  }
}