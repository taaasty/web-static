export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';
export const APP_STATE_SET_POPUP = 'APP_STATE_SET_POPUP';
export const APP_STATE_SET_HERO = 'APP_STATE_SET_HERO';

export const POPUP_USER_ONBOARDING = 'POPUP_USER_ONBOARDING';
export const POPUP_SETTINGS = 'POPUP_SETTINGS';
export const POPUP_DESIGN_SETTINGS = 'POPUP_DESIGN_SETTINGS';
export const POPUP_GET_PREMIUM = 'POPUP_GET_PREMIUM';
export const POPUP_PREMIUM = 'POPUP_PREMIUM';
export const POPUP_MESSAGES = 'POPUP_MESSAGES';

function setHero(flag) {
  return {
    type: APP_STATE_SET_HERO,
    flag,
  };
}

export function openHero() {
  return setHero(true);
}

export function closeHero() {
  return setHero(false);
}

function appStateSetEditing(flag) {
  return {
    type: APP_STATE_SET_EDITING,
    editing: flag,
  };
}

function appStateSetPopup(flagName, flag, rest) {
  return {
    type: APP_STATE_SET_POPUP,
    flagName,
    flag,
    ...rest,
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
    return dispatch(appStateSetPopup(POPUP_DESIGN_SETTINGS, !getState()
      .appState.popups[POPUP_DESIGN_SETTINGS].visible));
  };
}

export function showGetPremiumPopup() {
  return appStateSetPopup(POPUP_GET_PREMIUM, true);
}

export function hideGetPremiumPopup() {
  return appStateSetPopup(POPUP_GET_PREMIUM, false);
}

export function showPremiumPopup() {
  return appStateSetPopup(POPUP_PREMIUM, true);
}

export function hidePremiumPopup() {
  return appStateSetPopup(POPUP_PREMIUM, false);
}

export function showMessagesPopup(userId) {
  return (dispatch) => {
    dispatch(closeHero());

    return dispatch(appStateSetPopup(POPUP_MESSAGES, true, { userId }));
  };
}

export function hideMessagesPopup() {
  return appStateSetPopup(POPUP_MESSAGES, false);
}

export function toggleMessagesPopup() {
  return (dispatch, getState) => {
    return dispatch(appStateSetPopup(POPUP_MESSAGES, !getState()
      .appState.popups[POPUP_MESSAGES].visible));
  };
}
