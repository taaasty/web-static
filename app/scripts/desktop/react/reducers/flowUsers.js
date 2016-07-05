import createReducer from './createReducer';
import {
  FLOW_USERS_REQUEST,
  FLOW_USERS_SUCCESS,
  FLOW_USERS_FAILURE,
  FLOW_USERS_RESET,
  FLOW_USERS_NEXT,
  FLOW_USERS_PREV,
  FLOW_USERS_QUERY,
} from '../actions/FlowUsersActions';

const initialState = {
  result: [],
  query: '',
  selected: 0,
  isFetching: false,
  error: null,
};

const actionMap = {
  [FLOW_USERS_REQUEST](state, { query }) {
    return Object.assign({}, state, {
      query,
      isFetching: true,
      error: null,
    });
  },

  [FLOW_USERS_SUCCESS](state, { response, query }) {
    return query === state.query
      ? Object.assign({}, state, {
        query,
        result: response.result,
        isFetching: false,
        error: null,
      })
      : state;
  },

  [FLOW_USERS_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },

  [FLOW_USERS_RESET]() {
    return Object.assign({}, initialState);
  },

  [FLOW_USERS_NEXT](state) {
    const selected = Math.min(state.selected + 1, state.result.length - 1);

    return Object.assign({}, state, { selected });
  },

  [FLOW_USERS_PREV](state) {
    const selected = Math.max(0, state.selected - 1);

    return Object.assign({}, state, { selected });
  },

  [FLOW_USERS_QUERY](state, query) {
    return Object.assign({}, state, { query });
  },
};

export default createReducer(initialState, actionMap);
