import createReducer from './createReducer';
import { APP_STATE_SET_EDITING } from '../actions/AppStateActions';

const initialState = {
  editing: false,
};

const actionMap = {
  [APP_STATE_SET_EDITING](state, { editing }) {
    return Object.assign({}, state, { editing} );
  },
};

export default createReducer(initialState, actionMap);
