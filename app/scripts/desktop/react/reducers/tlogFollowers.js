import createReducer from './createReducer';
import {
  TLOG_FOLLOWERS_REQUEST,
  TLOG_FOLLOWERS_SUCCESS,
  TLOG_FOLLOWERS_FAILURE,
} from '../actions/TlogFollowersActions';

const initialState = {
  ids: [],
  tlogId: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_FOLLOWERS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TLOG_FOLLOWERS_SUCCESS](state, { response, tlogId }) {
    return Object.assign({}, state, {
      tlogId,
      ids: response.result.relationships,
      isFetching: false,
      error: null,
    });
  },

  [TLOG_FOLLOWERS_FAILURE](state, { error, tlogId }) {
    return Object.assign({}, state, {
      error,
      tlogId,
      ids: [],
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
