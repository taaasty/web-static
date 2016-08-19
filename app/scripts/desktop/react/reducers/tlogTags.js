import createReducer from './createReducer';
import {
  TLOG_TAGS_REQUEST,
  TLOG_TAGS_SUCCESS,
  TLOG_TAGS_FAILURE,
} from '../actions/TlogTagsActions';

const initialState = {
  tags: [],
  tlogId: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_TAGS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TLOG_TAGS_SUCCESS](state, { response, tlogId }) {
    const tags = Object.values(response.result);

    return Object.assign({}, state, {
      tlogId,
      tags,
      isFetching: false,
      error: null,
    });
  },

  [TLOG_TAGS_FAILURE](state, { error, tlogId }) {
    return Object.assign({}, state, {
      error,
      tlogId,
      tags: [],
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
