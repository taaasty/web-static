import createReducer from '../../reducers/createReducer';
import {
  MSG_NOTIFY_READY_REQUEST,
  MSG_NOTIFY_READY_SUCCESS,
  MSG_NOTIFY_READY_FAILURE,
} from '../actions/PusherActions';
import {
  MSG_CONVERSATIONS_POST_REQUEST,
  MSG_CONVERSATIONS_POST_SUCCESS,
  MSG_CONVERSATIONS_POST_FAILURE,
} from '../actions/ConversationsActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isFetching: false,
  error: null,
  isFetchingNewConversation: false,
  errorNewConversation: null,
});

const actionMap = {
  [MSG_NOTIFY_READY_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [MSG_NOTIFY_READY_SUCCESS](state) {
    return state.merge({
      isFetching: false,
      error: null,
    });
  },

  [MSG_NOTIFY_READY_FAILURE](state, { error }) {
    return state.merge({
      isFetching: false,
      error,
    })
  },

  [MSG_CONVERSATIONS_POST_REQUEST](state) {
    return state.merge({
      isFetchingNewConversation: true,
      errorNewConversation: null,
    });
  },

  [MSG_CONVERSATIONS_POST_SUCCESS](state) {
    return state.merge({
      isFetchingNewConversation: false,
      errorNewConversation: null,
    });
  },

  [MSG_CONVERSATIONS_POST_FAILURE](state, { error }) {
    return state.merge({
      isFetchingNewConversation: false,
      errorNewConversation: error,
    });
  },
};

export default createReducer(initialState, actionMap);
