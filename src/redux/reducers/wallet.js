import {
  REQUEST_API,
  REQUEST_API_SUCCESSFUL,
  DISPATCH_EXPENSES,
  REQUEST_SUM_VALUE,
} from '../actions';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  currencies: [],
  expenses: [],
  ask: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
      error: null,
    };

  case REQUEST_API_SUCCESSFUL:
    return {
      ...state,
      currencies: Object.keys(action.data),
      isLoading: false,
      error: null,
    };

  case DISPATCH_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.value],
    };

  case REQUEST_SUM_VALUE:
    return {
      ...state,
      ask: parseFloat((state.ask + action.value).toFixed(2)),
    };

  default:
    return state;
  }
};

export default wallet;
