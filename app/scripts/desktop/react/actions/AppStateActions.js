export const APP_STATE_SET_SEARCH_KEY = 'APP_STATE_SET_SEARCH_KEY';
export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';
export const APP_STATE_SET_EDIT_PREVIEW = 'APP_STATE_SET_EDIT_PREVIEW';

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

export function appStateSetEditPreview(flag) {
  return {
    type: APP_STATE_SET_EDIT_PREVIEW,
    payload: flag,
  };
}

export function appStateToggleEditPreview() {
  return (dispatch, getState) => {
    return dispatch(appStateSetEditPreview(!getState().appState.data.editPreview));
  };
}
