import createReducer from './createReducer';
import {
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
  CURRENT_USER_USERPIC,
  CURRENT_USER_CONFIRM_EMAIL_REQUEST,
  CURRENT_USER_CONFIRM_EMAIL_CANCEL,
  CURRENT_USER_CONFIRM_EMAIL_RESEND,
  CURRENT_USER_CONFIRM_EMAIL_FAILURE,
  CURRENT_USER_STOP_FB_CROSSPOST,
  CURRENT_USER_STOP_TWITTER_CROSSPOST,
} from '../actions/CurrentUserActions';
import { INIT_CURRENT_USER } from '../actions/InitActions';
import { CROSSPOST_NONE } from '../constants/CrosspostConstants';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
  isConfirmEmailSent: false,
  isFetchingConfirmEmail: false,
  errorConfirmEmail: null,
};

const actionMap = {
  [INIT_CURRENT_USER](state, { user }) {
    console.debug && console.debug('Залогинен пользователь', user && user.slug);
    return Object.assign({}, state, { data: user || initialState.data });
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

  [CURRENT_USER_CONFIRM_EMAIL_REQUEST](state) {
    return Object.assign({}, state, {
      isFetchingConfirmEmail: true,
      errorConfirmEmail: null,
    });
  },

  [CURRENT_USER_CONFIRM_EMAIL_CANCEL](state) {
    const data = Object.assign({}, state.data, { confirmationEmail: null });

    return Object.assign({}, state, {
      data,
      isFetchingConfirmEmail: false,
      errorConfirmEmail: null,
    });
  },

  [CURRENT_USER_CONFIRM_EMAIL_RESEND](state) {
    return Object.assign({}, state, {
      isConfirmEmailSent: true,
      isFetchingConfirmEmail: false,
      errorConfirmEmail: null,
    });
  },

  [CURRENT_USER_CONFIRM_EMAIL_FAILURE](state, { error }) {
    return Object.assign({}, state, {
      isFetchingConfirmEmail: false,
      errorConfirmEmail: error,
    });
  },
};

export default createReducer(initialState, actionMap);
