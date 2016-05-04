import createReducer from './createReducer';
import {
  TLOG_REQUEST,
  TLOG_SUCCESS,
  TLOG_FAILURE,
} from '../actions/TlogActions';

const initialState = {
  data: null,
  isFetching: false,
  isFetchingRelationship: false,
  error: null,
  errorRelationship: null,
};

const actionMap = {
  [TLOG_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },
  [TLOG_SUCCESS](state, { response }) {
    return Object.assign({}, state, {
      data: response.result,
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
