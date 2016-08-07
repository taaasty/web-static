import chooser from './chooser';
import connectionState from './connectionState';
import conversations from './conversations';
import messages from './messages';
import messagesPopup from './messagesPopup';
import messagingStatus from './messagingStatus';
import typing from './typing';

export default function (state, action) {
  return {
    chooser: chooser(state && state.chooser, action),
    connectionState: connectionState(state && state.connectionState, action),
    conversations: conversations(state && state.conversations, action),
    messages: messages(state && state.messages, action),
    messagesPopup: messagesPopup(state && state.messagesPopup, action),
    messagingStatus: messagingStatus(state && state.messagingStatus, action),
    typing: typing(state && state.typing, action),
  };
}
