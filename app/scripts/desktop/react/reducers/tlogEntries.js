import { merge } from 'lodash';
import createReducer from './createReducer';
import {
  TLOG_ENTRIES_REQUEST,
  TLOG_ENTRIES_SUCCESS,
  TLOG_ENTRIES_FAILURE,
  TLOG_ENTRIES_DELETE_ENTRY,
  TLOG_ENTRIES_RESET,
  TLOG_ENTRIES_INVALIDATE,
} from '../actions/TlogEntriesActions';

export const initialState = {
  data: {
    items: [],
    limit: null,
    hasMore: null,
    nextSinceEntryId: null,
  },
  signature: null,
  isFetching: false,
  error: null,
  invalid: false,
};

const actionMap = {
  [TLOG_ENTRIES_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [TLOG_ENTRIES_SUCCESS](state, { response, signature }) {
    const data = signature === state.signature
            ? merge({}, state.data, response.result, { items: state.data.items.concat(response.result.items) })
            : response.result;

    return Object.assign({}, state, {
      data,
      signature,
      isFetching: false,
      error: null,
      invalid: false,
    });
  },

  [TLOG_ENTRIES_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
      invalid: false,
    });
  },

  [TLOG_ENTRIES_RESET](state) {
    return Object.assign({}, state, { data: initialState.data });
  },

  [TLOG_ENTRIES_DELETE_ENTRY](state, { entryId }) {
    const items = state.data.items.filter((id) => id !== entryId);

    return Object.assign({}, state, { data: Object.assign({}, state.data, { items }) });
  },

  [TLOG_ENTRIES_INVALIDATE](state) {
    return merge({}, state, { invalid: true });
  },
};

export default createReducer(initialState, actionMap);
