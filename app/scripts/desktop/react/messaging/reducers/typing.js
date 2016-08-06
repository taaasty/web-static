import createReducer from '../../reducers/createReducer';
import {
  MSG_TYPING_INIT,
  MSG_TYPING_CANCEL,
} from '../actions/TypingActions';
import { List, fromJS } from 'immutable';

const initialState = fromJS({});

const actionMap = {
  [MSG_TYPING_INIT](state, { data }) {
    const { conversationId, userId } = data;

    return state.updateIn(
      [conversationId],
      List(),
      (arr) => arr.push(userId)
    );
  },

  [MSG_TYPING_CANCEL](state, { data }) {
    const { conversationId, userId } = data;

    return state.updateIn(
      [conversationId],
      List(),
      (arr) => arr.delete(arr.keyOf(userId))
    );
  },
};

export default createReducer(initialState, actionMap);
