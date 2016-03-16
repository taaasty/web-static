export const APP_STATE_SET_SEARCH_KEY = 'APP_STATE_SET_SEARCH_KEY';

export function appStateSetSearchKey(key) {
  return {
    type: APP_STATE_SET_SEARCH_KEY,
    payload: key,
  };
}
