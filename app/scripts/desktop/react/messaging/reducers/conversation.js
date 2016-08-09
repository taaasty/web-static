import createReducer from '../../reducers/createReducer';
import {
  MSG_NOTIFY_READY_REQUEST,
  MSG_NOTIFY_READY_SUCCESS,
  MSG_NOTIFY_READY_FAILURE,
} from '../actions/PusherActions';
import {
  MSG_CONVERSATION_POST_REQUEST,
  MSG_CONVERSATION_POST_SUCCESS,
  MSG_CONVERSATION_POST_FAILURE,
  MSG_CONVERSATION_MSGS_REQUEST,
  MSG_CONVERSATION_MSGS_SUCCESS,
  MSG_CONVERSATION_MSGS_FAILURE,
} from '../actions/ConversationActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  state: {},
  isFetchingList: false,
  errorList: null,
  isFetchingNewConversation: false,
  errorNewConversation: null,
});

const actionMap = {
  [MSG_NOTIFY_READY_REQUEST](state) {
    return state.merge({
      isFetchingList: true,
      errorList: null,
    });
  },

  [MSG_NOTIFY_READY_SUCCESS](state) {
    return state.merge({
      isFetchingList: false,
      errorList: null,
    });
  },

  [MSG_NOTIFY_READY_FAILURE](state, { error }) {
    return state.merge({
      isFetchingList: false,
      errorList: error,
    });
  },

  [MSG_CONVERSATION_POST_REQUEST](state) {
    return state.merge({
      isFetchingNewConversation: true,
      errorNewConversation: null,
    });
  },

  [MSG_CONVERSATION_POST_SUCCESS](state) {
    return state.merge({
      isFetchingNewConversation: false,
      errorNewConversation: null,
    });
  },

  [MSG_CONVERSATION_POST_FAILURE](state, { error }) {
    return state.merge({
      isFetchingNewConversation: false,
      errorNewConversation: error,
    });
  },

  [MSG_CONVERSATION_MSGS_REQUEST](state, { conversationId }) {
    return state.mergeIn(['state', conversationId], {
      isFetching: true,
      error: null,
    });
  },

  [MSG_CONVERSATION_MSGS_SUCCESS](state, { response, conversationId }) {
    return state.mergenIn(['state', conversationId], {
      isFetching: false,
      error: null,
      data: response.result,
    });
  },

  [MSG_CONVERSATION_MSGS_FAILURE](state, { error, conversationId }) {
    return state.mergeIn(['state', conversationId], {
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
