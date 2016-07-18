import createReducer from './createReducer';
import {
  CURRENT_USER_SETUP,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
  CURRENT_USER_CONFIRM_EMAIL_CANCEL,
  CURRENT_USER_STOP_FB_CROSSPOST,
  CURRENT_USER_STOP_TWITTER_CROSSPOST,
} from '../actions/CurrentUserActions';
import { CROSSPOST_NONE } from '../constants/CrosspostConstants';

const initialState = {
  data: {},
  isFetching: false,
};

function updateData(state, payload) {
  return { ...state, data: { ...state.data, ...payload } };
}

const actionMap = {
  [CURRENT_USER_SETUP](state, payload) {
    console.debug && console.debug('Залогинен пользователь', payload && payload.slug);
    return { ...state, data: payload || initialState.data };
  },

  [CURRENT_USER_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [CURRENT_USER_SUCCESS](state, data) {
    
  }
};

export default createReducer(initialState, actionMap);
