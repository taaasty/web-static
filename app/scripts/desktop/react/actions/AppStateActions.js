export const APP_STATE_SET_SEARCH_KEY = 'APP_STATE_SET_SEARCH_KEY';
export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';

export function appStateSetSearchKey(key) {
  return {
    type: APP_STATE_SET_SEARCH_KEY,
    payload: key,
  };
}

export function appStateSetEditing(flag) {
  return {
    type: APP_STATE_SET_EDITING,
    payload: flag,
  };
}
