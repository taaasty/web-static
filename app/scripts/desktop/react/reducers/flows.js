import createReducer from './createReducer';
import {
  FLOWS_REQUEST,
  FLOWS_SUCCESS,
  FLOWS_FAILURE,
} from '../actions/FlowsActions';

const initialState = {
  data: {
    items: [],
    hasMore: void 0,
    currentPage: void 0,
    nextPage: void 0,
  },
  isFetching: false,
  filter: null,
  error: null,
};

const actionMap = {
  [FLOWS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [FLOWS_SUCCESS](state, { response, filter }) {
    const data = Object.assign({}, state.data, response.result, {
      items: state.filter !== filter
        ? response.result.items
        : state.data.items.concat(response.result.items),
    });

    return Object.assign({}, state, {
      data,
      filter,
      isFetching: false,
      error: null,
    });
  },

  [FLOWS_FAILURE](state, { error, filter }) {
    return Object.assign({}, state, {
      error,
      filter,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
