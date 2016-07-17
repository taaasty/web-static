import createReducer from './createReducer';
import {
  APP_STATE_SET_EDITING,
  APP_STATE_SET_POPUP,
} from '../actions/AppStateActions';

const initialState = {
  editing: false,
  popups: {
    isUserOnboardingPopupVisible: false,
  },
};

const actionMap = {
  [APP_STATE_SET_EDITING](state, { editing }) {
    return Object.assign({}, state, { editing } );
  },

  [APP_STATE_SET_POPUP](state, { flagName, flag }) {
    return Object.assign({}, state, {
      popups: Object.assign({}, state.popups, { [flagName]: flag }),
    });
  },
};

export default createReducer(initialState, actionMap);
