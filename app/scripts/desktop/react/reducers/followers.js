import createReducer from './createReducer';
import {
  FOLLOWERS_REQUEST,
  FOLLOWERS_SUCCESS,
  FOLLOWERS_FAILURE,
} from '../actions/FollowersActions';

const initialState = {
  ids: [],
  tlogId: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [FOLLOWERS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [FOLLOWERS_SUCCESS](state, { response, tlogId }) {
    return Object.assign({}, state, {
      tlogId,
      ids: response.result.relationships,
      isFetching: false,
      error: null,
    });
  },

  [FOLLOWERS_FAILURE](state, { error, tlogId }) {
    return Object.assign({}, state, {
      error,
      tlogId,
      ids: [],
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
