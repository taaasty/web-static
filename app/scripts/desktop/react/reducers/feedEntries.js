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

export const FEED_VIEW_STYLE_LS_KEY = 'feedViewStyle';

const initialState = {
  data: {
    items: [],
    limit: null,
    has_more: null,
    next_since_entry_id: null,
  },
  isFetching: false,
  type: '',
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
      isFetching: false,
      error: null,
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
