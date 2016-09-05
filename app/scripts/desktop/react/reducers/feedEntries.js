import AppStorage from '../../../shared/resources/AppStorage';
import createReducer from './createReducer';
import {
  FEED_ENTRIES_REQUEST,
  FEED_ENTRIES_SUCCESS,
  FEED_ENTRIES_FAILURE,
  FEED_ENTRIES_RESET,
  FEED_ENTRIES_SET_VISIBLE,
  FEED_ENTRIES_VIEW_STYLE,
} from '../actions/FeedEntriesActions';
import { VIEW_STYLE_BRICKS } from '../constants/ViewStyleConstants';

export const FEED_VIEW_STYLE_LS_KEY = 'feedViewStyle';

const initialState = {
  data: {
    items: [],
    limit: null,
    nextSinceEntryId: null,
  },
  signature: null,
  isFetching: false,
  error: null,
  viewStyle: AppStorage.getItem(FEED_VIEW_STYLE_LS_KEY) || VIEW_STYLE_BRICKS,
  visible: 0,
};

const actionMap = {
  [FEED_ENTRIES_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [FEED_ENTRIES_SUCCESS](state, { response, signature, isPrepend }) {
    const data = signature === state.signature ?
      Object.assign({}, state.data, isPrepend ? {} : response.result, {
        items: state.data.items.concat(response.result.items),
      }) :
      response.result;

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
    return Object.assign({}, state, {
      data: initialState.data,
      visible: 0,
    });
  },

  [FEED_ENTRIES_SET_VISIBLE](state, { visible }) {
    return Object.assign({}, state, { visible });
  },

  [FEED_ENTRIES_VIEW_STYLE](state, { viewStyle }) {
    AppStorage.setItem(FEED_VIEW_STYLE_LS_KEY, viewStyle);
    return Object.assign({}, state, { viewStyle });
  },
};

export default createReducer(initialState, actionMap);
