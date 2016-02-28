/*global AppStorage */
import createReducer from './createReducer';
import {
  FEED_ENTRIES_REQUEST,
  FEED_ENTRIES_RECEIVE,
  FEED_ENTRIES_ERROR,
  FEED_ENTRIES_RESET,
  FEED_ENTRIES_VIEW_STYLE,
} from '../actions/FeedEntriesActions';
import { VIEW_STYLE_BRICKS } from '../constants/ViewStyleConstants';
import { ENTRY_PINNED_STATE } from '../constants/EntryConstants';

export const FEED_VIEW_STYLE_LS_KEY = 'feedViewStyle';

// keep only uniques and hoist pinned entries, fix hoisting
function prepareItems(items) {
  const ids = [];

  return items && items
    .reduce((acc, item) => {
      if (!item || ids.indexOf(item.entry.id) > -1) {
        return acc;
      } else {
        return ids.push(item.entry.id), acc.push(item), acc;
      }
    }, []);
/*
    .sort((a, b) => {
      const aPinned = a.entry.fixed_state === ENTRY_PINNED_STATE ? 0 : 1;
      const bPinned = b.entry.fixed_state === ENTRY_PINNED_STATE ? 0 : 1;

      return aPinned - bPinned;
    });
*/
}

const initialState = {
  data: {
    items: [],
    limit: null,
    has_more: null,
    next_since_entry_id: null,
  },
  isFetching: false,
  apiType: '',
  rating: '',
  sinceId: null,
  error: null,
  viewStyle: VIEW_STYLE_BRICKS,
};

const actionMap = {
  [FEED_ENTRIES_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [FEED_ENTRIES_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      data: { ...data.data, items: prepareItems(data.data && data.data.items) },
      error: null,
      isFetching: false,
    };
  },
  
  [FEED_ENTRIES_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },

  [FEED_ENTRIES_RESET](state) {
    return {
      ...state,
      data: initialState.data,
    };
  },

  [FEED_ENTRIES_VIEW_STYLE](state, style) {
    AppStorage.setItem(FEED_VIEW_STYLE_LS_KEY, style);
    return {
      ...state,
      viewStyle: style,
    };
  },
};

export default createReducer(initialState, actionMap);
