import createReducer from './createReducer';
import {
  TLOG_ENTRIES_REQUEST,
  TLOG_ENTRIES_RECEIVE,
  TLOG_ENTRIES_DELETE_ENTRY,
  TLOG_ENTRIES_ERROR,
  TLOG_ENTRIES_RESET,
} from '../actions/TlogEntriesActions';

export const initialState = {
  data: {
    items: [],
    limit: null,
    has_more: null,
    next_since_entry_id: null,
  },
  id: null,
  section: '',
  query: '',
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_ENTRIES_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [TLOG_ENTRIES_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      isFetching: false,
      error: null,
    };
  },

  [TLOG_ENTRIES_RESET](state) {
    return {
      ...state,
      data: initialState.data,
    };
  },

  [TLOG_ENTRIES_DELETE_ENTRY](state, entryId) {
    const items = state.data.items.filter((item) => item.entry.id !== entryId);

    return {
      ...state,
      data: { ...state.data, items },
    };
  },

  [TLOG_ENTRIES_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },
};

export default createReducer(initialState, actionMap);
