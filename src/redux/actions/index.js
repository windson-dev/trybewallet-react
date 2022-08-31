export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESSFUL = 'REQUEST_API_SUCCESSFUL';
export const REQUEST_API_FAILURE = 'REQUEST_API_REQUEST_API_FAILURE';
export const DISPATCH_EXPENSES = 'DISPATCH_EXPENSES';
export const REQUEST_SUM_VALUE = 'REQUEST_SUM_VALUE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const changeEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const requestAPISuccessful = (data) => ({
  type: REQUEST_API_SUCCESSFUL,
  data,
});

export const requestAPIError = (error) => ({
  type: REQUEST_API_FAILURE,
  error,
});

export const dispatchExpenses = (value) => ({
  type: DISPATCH_EXPENSES,
  value,
});

export const sumAskValue = (value) => ({
  type: REQUEST_SUM_VALUE,
  value,
});

export const deleteExpense = (value) => ({
  type: DELETE_EXPENSE,
  value,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const getAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await getAPI.json();
      delete data.USDT;
      dispatch(requestAPISuccessful(data));
    } catch (error) {
      dispatch(requestAPIError(error.message));
    }
  };
}
