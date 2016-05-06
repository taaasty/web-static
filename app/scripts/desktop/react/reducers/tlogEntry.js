import createReducer from './createReducer';
import {
  TLOG_ENTRY_REQUEST,
  TLOG_ENTRY_SUCCESS,
  TLOG_ENTRY_FAILURE,
} from '../actions/TlogEntryActions';

const initialState = {
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_ENTRY_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TLOG_ENTRY_SUCCESS](state) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
    });
  },

  [TLOG_ENTRY_FAILURE](state, error) {
    return Object.assign({}, error, {
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
