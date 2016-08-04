import createReducer from '../../reducers/createReducer';
import {
  CONNECTION_STATE_NOT_CONNECTED,
} from '../constants';
import {
  MSG_CONNECTION_STATE_SET,
} from '../actions/ConnectionStateActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  state: CONNECTION_STATE_NOT_CONNECTED,
});

const actionMap = {
  [MSG_CONNECTION_STATE_SET](state, { state: connectionState }) {
    return state.set('state', connectionState);
  },
};

export default createReducer(initialState, actionMap);
