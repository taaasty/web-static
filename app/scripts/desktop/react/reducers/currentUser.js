import createReducer from './createReducer';
import {
  CURRENT_USER_SETUP,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
  CURRENT_USER_USERPIC,
  CURRENT_USER_CONFIRM_EMAIL_CANCEL,
  CURRENT_USER_STOP_FB_CROSSPOST,
  CURRENT_USER_STOP_TWITTER_CROSSPOST,
} from '../actions/CurrentUserActions';
import { CROSSPOST_NONE } from '../constants/CrosspostConstants';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
};

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

  [CURRENT_USER_SUCCESS](state, { response: { entities, result } }) {
    const data = Object.assign({}, state.data, entities.tlog[result]);

    return Object.assign({}, state, {
      data,
      isFetching: false,
      error: null,
    });
  },

  [CURRENT_USER_USERPIC](state, { response }) {
    const data = Object.assign({}, state.data, { userpic: response.result });

    return Object.assign({}, state, {
      data,
      isFetching: false,
      error: null,
    });
  },

  [CURRENT_USER_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
