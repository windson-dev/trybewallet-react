import {
  REQUEST_API,
  REQUEST_API_SUCCESSFUL,
  DISPATCH_EXPENSES,
  REQUEST_SUM_VALUE,
  REQUEST_API_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  currencies: [],
  expenses: [],
  totalSumValues: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };

  case REQUEST_API_SUCCESSFUL:
    return {
      ...state,
      currencies: Object.keys(action.data),
      isLoading: false,
      error: null,
    };

  case REQUEST_API_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  case DISPATCH_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.value],
    };

  case REQUEST_SUM_VALUE:
    return {
      ...state,
      totalSumValues: parseFloat((state.totalSumValues + action.value).toFixed(2)),
    };

  default:
    return state;
  }
}

export default wallet;
