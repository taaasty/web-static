import createReducer from '../../reducers/createReducer';
import { fromJS } from 'immutable';
import {
  MSG_UPDATE_MESSAGING_STATUS,
} from '../actions/MessagingStatusActions';

const initialState = fromJS({
  unreadNotificationsCount: 0,
  unreadConversationsCount: 0,
  activeConversationsCount: 0,
});

const actionMap = {
  [MSG_UPDATE_MESSAGING_STATUS](state, { status }) {
    return state.merge(status);
  },
};

export default createReducer(initialState, actionMap);
