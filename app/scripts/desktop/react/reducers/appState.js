import createReducer from './createReducer';
import {
  APP_STATE_SET_EDITING,
  APP_STATE_SET_POPUP,
  POPUP_USER_ONBOARDING,
  POPUP_SETTINGS,
  POPUP_DESIGN_SETTINGS,
  POPUP_GET_PREMIUM,
  POPUP_PREMIUM,
  POPUP_MESSAGES,
} from '../actions/AppStateActions';

const initialState = {
  editing: false,
  popups: {
    [POPUP_USER_ONBOARDING]: false,
    [POPUP_SETTINGS]: false,
    [POPUP_DESIGN_SETTINGS]: false,
    [POPUP_GET_PREMIUM]: false,
    [POPUP_PREMIUM]: false,
    [POPUP_MESSAGES]: false,
  },
};

const actionMap = {
  [APP_STATE_SET_EDITING](state, { editing }) {
    return Object.assign({}, state, { editing });
  },

  [APP_STATE_SET_POPUP](state, { flagName, flag }) {
    return Object.assign({}, state, {
      popups: Object.assign({}, state.popups, {
        [flagName]: flag,
      }),
    });
  },
};

export default createReducer(initialState, actionMap);
