import createReducer from './createReducer';
import {
  APP_STATE_SET_SEARCH_KEY,
  APP_STATE_SET_EDITING,
  APP_STATE_SET_EDIT_PREVIEW,
} from '../actions/AppStateActions';

const initialState = {
  data: {
    searchKey: '',
    editing: false,
    editPreview: false,
  },
};

const actionMap = {
  [APP_STATE_SET_SEARCH_KEY](state, payload) {
    return {
      ...state,
      data: {
        ...state.data,
        searchKey: payload,
      },
    };
  },

  [APP_STATE_SET_EDITING](state, payload) {
    return {
      ...state,
      data: {
        ...state.data,
        editing: payload,
      },
    };
  },

  [APP_STATE_SET_EDIT_PREVIEW](state, payload) {
    return {
      ...state,
      data: {
        ...state.data,
        editPreview: payload,
      },
    };
  },
};

export default createReducer(initialState, actionMap);
