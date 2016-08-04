import createReducer from '../../reducers/createReducer';
import { fromJS } from 'immutable';
import {
  MSG_POPUP_STATE_CONVERSATIONS,
  MSG_POPUP_SET_CONVERSATION_ID,
  MSG_POPUP_SET_HISTORY,
  MSG_POPUP_PUSH_HISTORY,
  MSG_POPUP_POP_HISTORY,
} from '../actions/MessagesPopupActions';

const initialState = fromJS({
  currentConversationId: null,
  history: [
    MSG_POPUP_STATE_CONVERSATIONS,
  ],
});

const actionMap = {
  [MSG_POPUP_SET_CONVERSATION_ID](state, { id }) {
    return state.set('currentConversationId', id);
  },

  [MSG_POPUP_SET_HISTORY](state, { history }) {
    return state.merge({ history });
  },

  [MSG_POPUP_PUSH_HISTORY](state, { popupState }) {
    return state.update('history', (arr) => arr.push(popupState));
  },

  [MSG_POPUP_POP_HISTORY](state) {
    return state.update('history', (arr) => arr.pop());
  },
};

export default createReducer(initialState, actionMap);
