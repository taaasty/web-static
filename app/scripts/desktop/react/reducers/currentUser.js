import {
  CURRENT_USER_SETUP,
  CURRENT_USER_UPDATE,
  CURRENT_USER_UPDATE_USERPIC,
  CURRENT_USER_CONFIRM_EMAIL_CANCEL,
  CURRENT_USER_STOP_FB_CROSSPOST,
  CURRENT_USER_STOP_TWITTER_CROSSPOST,
} from '../actions/CurrentUserActions';
import { CROSSPOST_NONE } from '../constants/CrosspostConstants';

/*
  isLogged() {
    return !!this.data.id;
  },
  isPrivate() {
    return this.data.is_privacy;
  },
  hasDesignBundle() {
    return !!this.data.has_design_bundle;
  },
  hasVkontakteAuth() {
    const { authentications } = this.data;

    return authentications && authentications.filter((auth) => auth.provider === 'vkontakte').length;
  },
  hasFacebookAuth() {
    const { authentications } = this.data;

    return authentications && authentications.filter((auth) => auth.provider === 'facebook').length;
  },
  getUser() {
    return this.data;
  },
  getUserId() {
    return this.data.id;
  },
  getAccessToken() {
    const { api_key } = this.data;
    return api_key && api_key.access_token;
  },
  getUserpic() {
    return this.data.userpic;
  },
  getOmniauthEnableUrl(social) {
    const { authentications } = this.data;
    return authentications && authentications
      .reduce((acc, el) => el.provider === social ? el.omniauth_enable_url : acc, null);
  },
*/

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
  [CURRENT_USER_UPDATE](state, payload) {
    return updateData(payload);
  },
  [CURRENT_USER_UPDATE_USERPIC](state, payload) {
    return updateData({ userpic: payload });
  },
  [CURRENT_USER_CONFIRM_EMAIL_CANCEL](state, payload) {
    return updateData({ confirmation_email: null });
  },
  [CURRENT_USER_STOP_FB_CROSSPOST](state) {
    const authentications = (state.data.authentications || [])
      .map((auth) => auth.provider === 'facebook'
                       ? { ...auth, crossposting_cd: CROSSPOST_NONE }
                       : auth);
    return updateData({ authentications });
  },
  [CURRENT_USER_STOP_TWITTER_CROSSPOST](state) {
    const authentications = (state.data.authentications || [])
      .map((auth) => auth.provider === 'twitter'
                       ? { ...auth, crossposting_cd: CROSSPOST_NONE }
                       : auth);
    return updateData({ authentications });
  },
};

export default function currentUser(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
