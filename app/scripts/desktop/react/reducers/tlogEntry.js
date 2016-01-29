import { TLOG_ENTRY_SET } from '../actions/TlogEntryActions';

const initialState = {
  isFetching: false,
  error: null,
  author: {},
  tlog: {},
};

const actionMap = {
  [TLOG_ENTRY_SET](state, entry) {
    return {
      ...state,
      ...entry,
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
