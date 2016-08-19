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
  CURRENT_USER_AUTH_FB,
  CURRENT_USER_AUTH_TWITTER,
  CURRENT_USER_CROSSPOST_NONE,
} from '../actions/CurrentUserActions';
import { INIT_CURRENT_USER } from '../actions/InitActions';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
  isConfirmEmailSent: false,
  isFetchingConfirmEmail: false,
  errorConfirmEmail: null,
};

function stopCrosspost(data, provider) {
  if (data.authentications) {
    return Object.assign({}, data, {
      authentications: data.authentications
        .map((auth) => auth.provider === provider
             ? Object.assign({}, auth, { crosspostingCd: CURRENT_USER_CROSSPOST_NONE })
             : auth),
    });
  } else {
    return data;
  }
}

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

  [CURRENT_USER_STOP_FB_CROSSPOST](state) {
    return Object.assign({}, state, {
      data: stopCrosspost(state.data, CURRENT_USER_AUTH_FB),
      isFetching: false,
      error: null,
    });
  },

  [CURRENT_USER_STOP_TWITTER_CROSSPOST](state) {
    return Object.assign({}, state, {
      data: stopCrosspost(state.data, CURRENT_USER_AUTH_TWITTER),
      isFetching: false,
      error: null,
    });
  },
};

export default createReducer(initialState, actionMap);
