import chooser from './chooser';
import connectionState from './connectionState';
import conversation from './conversation';
import groupSettings from './groupSettings';
import message from './message';
import messagesPopup from './messagesPopup';
import messagingStatus from './messagingStatus';
import thread from './thread';
import typing from './typing';

export default function (state, action) {
  return {
    chooser: chooser(state && state.chooser, action),
    connectionState: connectionState(state && state.connectionState, action),
    conversation: conversation(state && state.conversation, action),
    groupSettings: groupSettings(state && state.groupSettings, action),
    message: message(state && state.message, action),
    messagesPopup: messagesPopup(state && state.messagesPopup, action),
    messagingStatus: messagingStatus(state && state.messagingStatus, action),
    thread: thread(state && state.thread, action),
    typing: typing(state && state.typing, action),
  };
}
