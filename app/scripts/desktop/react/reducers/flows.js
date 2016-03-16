import createReducer from './createReducer';
import {
  FLOWS_REQUEST,
  FLOWS_RECEIVE,
  FLOWS_ERROR,
  FLOWS_RESET,
} from '../actions/FlowsActions';

const initialState = {
  data: {
    items: [],
    has_more: void 0,
    current_page: void 0,
    next_page: void 0,
  },
  isFetching: false,
  filter: null,
  error: null,
};

const actionMap = {
  [FLOWS_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      isFetching: false,
      error: null,
    };
  },

  [FLOWS_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [FLOWS_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },

  [FLOWS_RESET](state) {
    return {
      ...state,
      data: initialState.data,
    }
  },
};

export default createReducer(initialState, actionMap);
