import {
  stopSelect,
} from './ThreadActions';
import {
  resetGroupSettings,
} from './GroupSettingsActions';
import {
  postNewConversation,
} from './ConversationActions';
import { List } from 'immutable';

export const MSG_POPUP_PUSH_HISTORY = 'MSG_POPUP_PUSH_HISTORY';
export const MSG_POPUP_POP_HISTORY = 'MSG_POPUP_POP_HISTORY';
export const MSG_POPUP_SET_HISTORY = 'MSG_POPUP_SET_HISTORY';

export const MSG_POPUP_STATE_CONVERSATIONS = 'MSG_POPUP_STATE_CONVERSATIONS';
export const MSG_POPUP_STATE_CREATE_NEW = 'MSG_POPUP_STATE_CREATE_NEW';
export const MSG_POPUP_STATE_THREAD = 'MSG_POPUP_STATE_THREAD';
export const MSG_POPUP_STATE_GROUP_CHOOSER = 'MSG_POPUP_STATE_GROUP_CHOOSER';
export const MSG_POPUP_STATE_GROUP_SETTINGS = 'MSG_POPUP_STATE_GROUP_SETTINGS';

export function openConversation(recipientId) {
  return (dispatch, getState) => {
    const conversation = getState()
      .entities
      .get('conversation', Map())
      .filter((c) => c.get('recipientId') === recipientId)
      .first();

    if (conversation) {
      return dispatch(showThread(conversation.get('id')));
    } else {
      return dispatch(postNewConversation(recipientId))
        .then(({ response }) => showThread(response.result));
    }
  };
}

export function initPopup() {
  return (dispatch) => {
    dispatch(resetGroupSettings());
    return dispatch(showConversationList());
  };
}

function setHistory(history) {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_SET_HISTORY,
      history,
    });
  };
}

function pushHistory(popupState) {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_PUSH_HISTORY,
      popupState,
    });
  };
}

export function historyBack() {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_POP_HISTORY,
    });
  };
}

export function showConversationList() {
  return setHistory([{ state: MSG_POPUP_STATE_CONVERSATIONS }]);
}

export function showCreateNew() {
  return pushHistory({ state: MSG_POPUP_STATE_CREATE_NEW });
}

function getHistory(state) {
  return state.msg.messagesPopup.get('history', List());
}

export function showGroupSettings() {
  return (dispatch, getState) => {
    const history = getHistory(getState());
    const prevState = history.getIn([history.count() - 2, 'state']);


    if (prevState === MSG_POPUP_STATE_GROUP_SETTINGS) {
      return dispatch(historyBack());
    } else {
      return dispatch(pushHistory({ state: MSG_POPUP_STATE_GROUP_SETTINGS }));
    }
  };
}

export function showGroupChooser() {
  return (dispatch, getState) => {
    const history = getHistory(getState());
    const prevState = history.getIn([history.count() - 2, 'state']);


    if (prevState === MSG_POPUP_STATE_GROUP_CHOOSER) {
      return dispatch(historyBack());
    } else {
      return dispatch(pushHistory({ state: MSG_POPUP_STATE_GROUP_CHOOSER }));
    }
  };
}

export function closeGroupSettings() {
  return (dispatch, getState) => {
    dispatch(resetGroupSettings());

    return dispatch(setHistory(getHistory(getState())
      .filter((e) => (
        e.get('state') !== MSG_POPUP_STATE_GROUP_CHOOSER &&
        e.get('state') !== MSG_POPUP_STATE_GROUP_SETTINGS
      ))
    ));
  };
}

export function showThread(conversationId) {
  return (dispatch) => {
    return dispatch(setHistory([
      { state: MSG_POPUP_STATE_CONVERSATIONS },
      { state: MSG_POPUP_STATE_THREAD, conversationId },
    ]));
  };
}
