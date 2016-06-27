import createReducer from './createReducer';
import {
  TLOG_FOLLOWINGS_REQUEST,
  TLOG_FOLLOWINGS_SUCCESS,
  TLOG_FOLLOWINGS_FAILURE,
} from '../actions/TlogFollowingsActions';

const initialState = {
  ids: [],
  tlogId: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_FOLLOWINGS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TLOG_FOLLOWINGS_SUCCESS](state, { response, tlogId }) {
    return Object.assign({}, state, {
      tlogId,
      ids: response.result.relationships,
      isFetching: false,
      error: null,
    });
  },

  [TLOG_FOLLOWINGS_FAILURE](state, { error, tlogId }) {
    return Object.assign({}, state, {
      error,
      tlogId,
      ids: [],
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
