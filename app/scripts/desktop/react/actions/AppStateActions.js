export const APP_STATE_SET_EDITING = 'APP_STATE_SET_EDITING';

function appStateSetEditing(flag) {
  return {
    type: APP_STATE_SET_EDITING,
    editing: flag,
  };
}

export function appStateStartEditing() {
  return appStateSetEditing(true);
}

export function appStateStopEditing() {
  return appStateSetEditing(false);
}
