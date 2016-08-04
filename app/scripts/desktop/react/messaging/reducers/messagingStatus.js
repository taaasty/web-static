import createReducer from '../../reducers/createReducer';
import { fromJS } from 'immutable';
import {
  MSG_UPDATE_MESSAGING_STATUS,
} from '../actions/MessagingStatusActions';

const initialState = fromJS({});

const actionMap = {
  [MSG_UPDATE_MESSAGING_STATUS](state, { status }) {
    return state.merge(status);
  },
};

export default createReducer(initialState, actionMap);
