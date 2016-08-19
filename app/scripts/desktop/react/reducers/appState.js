import createReducer from './createReducer';
import {
  APP_STATE_SET_EDITING,
  APP_STATE_SET_POPUP,
  APP_STATE_SET_HERO,
  POPUP_USER_ONBOARDING,
  POPUP_SETTINGS,
  POPUP_DESIGN_SETTINGS,
  POPUP_GET_PREMIUM,
  POPUP_PREMIUM,
  POPUP_MESSAGES,
} from '../actions/AppStateActions';

const initialState = {
  editing: false,
  isHeroOpen: false,
  popups: {
    [POPUP_USER_ONBOARDING]: { visible: false },
    [POPUP_SETTINGS]: { visible: false },
    [POPUP_DESIGN_SETTINGS]: { visible: false },
    [POPUP_GET_PREMIUM]: { visible: false },
    [POPUP_PREMIUM]: { visible: false },
    [POPUP_MESSAGES]: { visible: false, userId: null },
  },
};

const actionMap = {
  [APP_STATE_SET_EDITING](state, { editing }) {
    return Object.assign({}, state, { editing });
  },

  [APP_STATE_SET_POPUP](state, { flagName, flag, ...rest }) {
    return Object.assign({}, state, {
      popups: Object.assign({}, state.popups, {
        [flagName]: { visible: flag, ...rest },
      }),
    });
  },

  [APP_STATE_SET_HERO](state, { flag }) {
    return Object.assign({}, state, {
      isHeroOpen: flag,
    });
  },
};

export default createReducer(initialState, actionMap);
