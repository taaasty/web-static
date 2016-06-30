import createReducer from './createReducer';
import {
  REPOST_FLOWS_REQUEST,
  REPOST_FLOWS_SUCCESS,
  REPOST_FLOWS_FAILURE,
} from '../actions/RepostFlowsActions';

const initialState = {
  data: {
    items: [],
    hasMore: true,
    nextPage: 0,
  },
  isFetching: false,
  error: null,
};

const actionMap = {
  [REPOST_FLOWS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [REPOST_FLOWS_SUCCESS](state, { response }) {
    const data = Object.assign({}, state.data, response, {
      items: state.data.items.concat(response.items),
    });

    return Object.assign({}, state, {
      data,
      isFetching: false,
      error: null,
    });
  },

  [REPOST_FLOWS_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
