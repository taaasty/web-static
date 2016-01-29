import {
  TLOG_ENTRY_REQUEST,
  TLOG_ENTRY_RECEIVE,
  TLOG_ENTRY_ERROR,
} from '../actions/TlogEntryActions';

const initialState = {
  isFetching: false,
  error: null,
  data: {
    commentator: {},
    author: {},
    tlog: {},
  },
};

const actionMap = {
  [TLOG_ENTRY_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [TLOG_ENTRY_RECEIVE](state, data) {
    return {
      data,
      isFetching: false,
      error: null,
    };
  },

  [TLOG_ENTRY_ERROR](state, error) {
    return {
      ...state,
      isFetching: false,
      error,
    };
  },
};

export default function tlogEntry(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
