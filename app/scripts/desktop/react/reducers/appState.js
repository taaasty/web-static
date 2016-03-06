import createReducer from './createReducer';
import {
  APP_STATE_SET_SEARCH_KEY,
} from '../actions/AppStateActions';

const initialState = {
  data: {
    searchKey: '',
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
};

export default createReducer(initialState, actionMap);
