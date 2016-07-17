export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';
export const APP_STATE_SET_POPUP = 'APP_STATE_SET_POPUP';

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
  return appStateSetPopup('isUserOnboardingPopupVisible', true);
}

export function hideUserOnboardingPopup() {
  return appStateSetPopup('isUserOnboardingPopupVisible', false);
}
