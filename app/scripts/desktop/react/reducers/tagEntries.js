import createReducer from './createReducer';
import {
  TAG_ENTRIES_REQUEST,
  TAG_ENTRIES_SUCCESS,
  TAG_ENTRIES_FAILURE,
} from '../actions/TagEntriesActions';

const initialState = {
  data: {
    items: [],
    hasMore: null,
    nextSinceEntryId: null,
  },
  signature: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [TAG_ENTRIES_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TAG_ENTRIES_SUCCESS](state, { response, signature }) {
    const data = signature === state.signature ?
      Object.assign({}, response.result, {
        items: state.data.items.concat(response.result.items),
      }) :
      response.result;

    return Object.assign({}, state, {
      data,
      signature,
      isFetching: false,
      error: null,
    });
  },

  [TAG_ENTRIES_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
