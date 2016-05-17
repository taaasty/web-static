/*global AppStorage */
import { merge } from 'lodash';
import createReducer from './createReducer';
import { List, Map } from 'immutable';
import {
  FEED_ENTRIES_REQUEST,
  FEED_ENTRIES_SUCCESS,
  FEED_ENTRIES_FAILURE,
  FEED_ENTRIES_RESET,
  FEED_ENTRIES_VIEW_STYLE,
} from '../actions/FeedEntriesActions';
import { VIEW_STYLE_BRICKS } from '../constants/ViewStyleConstants';

export const FEED_VIEW_STYLE_LS_KEY = 'feedViewStyle';

const initialState = {
  data: {
    items: [],
    limit: null,
    hasMore: null,
    nextSinceEntryId: null,
  },
  signature: null,
  isFetching: false,
  error: null,
  viewStyle: AppStorage.getItem(FEED_VIEW_STYLE_LS_KEY) || VIEW_STYLE_BRICKS,
};

const actionMap = {
  [FEED_ENTRIES_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [FEED_ENTRIES_SUCCESS](state, { response, signature }) {
    const data = signature === state.signature
            ? merge({}, state.data, response.result, { items: state.data.items.concat(response.result.items) })
            : response.result;

    return Object.assign({}, state, {
      data,
      signature,
      error: null,
      isFetching: false,
    });
  },
  
  [FEED_ENTRIES_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },

  [FEED_ENTRIES_RESET](state) {
    return Object.assign({}, state, { data: initialState.data });
  },

  [FEED_ENTRIES_VIEW_STYLE](state, { viewStyle }) {
    AppStorage.setItem(FEED_VIEW_STYLE_LS_KEY, viewStyle);
    return Object.assign({}, state, { viewStyle });
  },
};

export default createReducer(initialState, actionMap);
