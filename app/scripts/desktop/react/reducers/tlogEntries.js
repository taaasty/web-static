import {
  TLOG_ENTRIES_REQUEST,
  TLOG_ENTRIES_RECEIVE,
  TLOG_ENTRIES_DELETE_ENTRY,
  TLOG_ENTRIES_ERROR,
} from '../actions/TlogEntriesActions';
import { ENTRY_PINNED_STATE } from '../constants/EntryConstants';

export const initialState = {
  data: {
    items: [],
    limit: null,
    has_more: null,
    next_since_entry_id: null,
  },
  id: null,
  section: '',
  type: '',
  isFetching: false,
  error: null,
};

// keep only uniques and hoist pinned entries, fix hoisting
function prepareData(data) {
  const ids = [];
  const items = data.items
          .reduce((acc, item) => {
            if (!item || ids.indexOf(item.entry.id) > -1) {
              return acc;
            } else {
              ids.push(item.entry.id);
              acc.push(item);
              return acc;
            }
          }, [])
          .sort((a, b) => {
            const aPinned = a.entry.fixed_state === ENTRY_PINNED_STATE ? 0 : 1;
            const bPinned = b.entry.fixed_state === ENTRY_PINNED_STATE ? 0 : 1;

            return aPinned - bPinned;
          });
  
  return {
    ...data,
    items,
  };
}

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
      ...data,
      isFetching: false,
      error: null,
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
      isFetching: false,
      error,
    };
  },
};

export default function tlogEntries(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
