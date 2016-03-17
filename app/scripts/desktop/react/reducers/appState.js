import createReducer from './createReducer';
import {
  APP_STATE_SET_SEARCH_KEY,
  APP_STATE_SET_EDITING,
} from '../actions/AppStateActions';

const initialState = {
  data: {
    searchKey: '',
    editing: false,
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
};

export default createReducer(initialState, actionMap);
