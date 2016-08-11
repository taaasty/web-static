import createReducer from '../../reducers/createReducer';
import {
  MSG_TYPING_INIT,
  MSG_TYPING_CANCEL,
} from '../actions/TypingActions';
import {
  MSG_PUSHER_PUSH_MESSAGE,
} from '../actions/PusherActions';
import { List, Map, fromJS } from 'immutable';

const initialState = fromJS({});

const actionMap = {
  [MSG_TYPING_INIT](state, { data }) {
    const { conversationId, userId, uuid } = data;

    return state.updateIn(
      [conversationId],
      List(),
      (arr) => arr.push(Map({ userId, uuid }))
    );
  },

  [MSG_TYPING_CANCEL](state, { data }) {
    const { conversationId, uuid } = data;
    const uuidKey = state
      .get(conversationId)
      .findKey((e) => e.get('uuid') === uuid);

    return state.deleteIn([conversationId, uuidKey]);
  },

  [MSG_PUSHER_PUSH_MESSAGE](state, { response }) { // stop any typing by this user
    const { conversationId, userId } = response.entities.message[response.result];

    return state.updateIn(
      [conversationId],
      List(),
      (arr) => arr.filter((e) => e.get('userId') !== userId)
    );
  },
};

export default createReducer(initialState, actionMap);
