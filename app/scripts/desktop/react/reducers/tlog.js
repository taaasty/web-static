import createReducer from './createReducer';
import {
  TLOG_REQUEST,
  TLOG_SUCCESS,
  TLOG_FAILURE,
} from '../actions/TlogActions';

const initialState = {
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_REQUEST](state, { slug }) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },
  [TLOG_SUCCESS](state) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
    });
  },
  [TLOG_FAILURE](state, error) {
    return Object.assign({}, state, error, {
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
