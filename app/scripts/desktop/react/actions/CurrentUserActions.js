export const CURRENT_USER_SETUP = 'CURRENT_USER_SETUP';
export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';
export const CURRENT_USER_UPDATE_USERPIC = 'CURRENT_USER_UPDATE_USERPIC';
export const CURRENT_USER_CONFIRM_EMAIL_CANCEL = 'CURRENT_USER_CONFIRM_EMAIL_CANCEL';
export const CURRENT_USER_STOP_FB_CROSSPOST = 'CURRENT_USER_STOP_FB_CROSSPOST';
export const CURRENT_USER_STOP_TWITTER_CROSSPOST = 'CURRENT_USER_STOP_TWITTER_CROSSPOST';

export function auth(state) {
  return state.currentUser.data.apiKey && {
    headers: {
      'X-User-Token': state.currentUser.data.apiKey.accessToken,
    },
  };
}
