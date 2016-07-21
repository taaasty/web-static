export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';
export const APP_STATE_SET_POPUP = 'APP_STATE_SET_POPUP';

export const POPUP_USER_ONBOARDING = 'POPUP_USER_ONBOARDING';
export const POPUP_SETTINGS = 'POPUP_SETTINGS';
export const POPUP_DESIGN_SETTINGS = 'POPUP_DESIGN_SETTINGS';

function appStateSetEditing(flag) {
  return {
    type: APP_STATE_SET_EDITING,
    editing: flag,
  };
}

function appStateSetPopup(flagName, flag) {
  return {
    type: APP_STATE_SET_POPUP,
    flagName,
    flag,
  };
}

export function appStateStartEditing() {
  return appStateSetEditing(true);
}

export function appStateStopEditing() {
  return appStateSetEditing(false);
}

export function showUserOnboardingPopup() {
  return appStateSetPopup(POPUP_USER_ONBOARDING, true);
}

export function hideUserOnboardingPopup() {
  return appStateSetPopup(POPUP_USER_ONBOARDING, false);
}

export function showSettingsPopup() {
  return appStateSetPopup(POPUP_SETTINGS, true);
}

export function hideSettingsPopup() {
  return appStateSetPopup(POPUP_SETTINGS, false);
}

export function showDesignSettingsPopup() {
  return appStateSetPopup(POPUP_DESIGN_SETTINGS, true);
}

export function hideDesignSettingsPopup() {
  return appStateSetPopup(POPUP_DESIGN_SETTINGS, false);
}

export function toggleDesignSettingsPopup() {
  return (dispatch, getState) => {
    return dispatch(appStateSetPopup(POPUP_DESIGN_SETTINGS, !getState().appState.popups[POPUP_DESIGN_SETTINGS]));
  };
}
