import createReducer from './createReducer';
import {
  TAG_ENTRIES_REQUEST,
  TAG_ENTRIES_RECEIVE,
  TAG_ENTRIES_RESET,
  TAG_ENTRIES_ERROR,
} from '../actions/TagEntriesActions';

const initialState = {
  data: {
    items: [],
    has_more: null,
    next_since_entry_id: null,
  },
  isFetching: false,
  error: null,
  slug: null,
  tags: null,
};

const actionMap = {
  [TAG_ENTRIES_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [TAG_ENTRIES_RESET](state) {
    return {
      ...state,
      data: initialState.data,
    };
  },

  [TAG_ENTRIES_RECEIVE](state, payload) {
    return {
      ...state,
      ...payload,
      isFetching: false,
      error: null,
    };
  },

  [TAG_ENTRIES_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },
};

export default createReducer(initialState, actionMap);
