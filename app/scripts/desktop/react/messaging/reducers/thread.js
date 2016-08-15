import createReducer from '../../reducers/createReducer';
import {
  MSG_THREAD_START_SELECT,
  MSG_THREAD_STOP_SELECT,
  MSG_THREAD_RESET_SELECTION,
  MSG_THREAD_TOGGLE_SELECTION,
  MSG_THREAD_SET_REPLY_TO,
  MSG_THREAD_CANCEL_REPLY_TO,
  MSG_THREAD_SET_MESSAGE_TEXT,
  MSG_THREAD_ADD_MESSAGE_FILES,
  MSG_THREAD_REMOVE_MESSAGE_FILE,
  MSG_THREAD_RESET_FORM,
} from '../actions/ThreadActions';
import {
  MSG_PUSHER_DELETE_MSGS,
  MSG_PUSHER_DELETE_USER_MSGS,
} from '../actions/PusherActions';
import { Set, fromJS } from 'immutable';

const initialState = fromJS({
  isSelectState: false,
  selectedUuids: Set(),
  replyToUuid: null,
  messageText: '',
  messageFiles: [],
});

const actionMap = {
  [MSG_THREAD_START_SELECT](state) {
    return state.set('isSelectState', true);
  },

  [MSG_THREAD_STOP_SELECT](state) {
    return state.set('isSelectState', false);
  },

  [MSG_THREAD_RESET_SELECTION](state) {
    return state.set('selectedUuids', Set());
  },

  [MSG_THREAD_TOGGLE_SELECTION](state, { uuid }) {
    return state.update(
      'selectedUuids',
      (s) => s.includes(uuid) ? s.delete(uuid) : s.add(uuid)
    );
  },

  [MSG_THREAD_SET_REPLY_TO](state, { uuid }) {
    return state.set('replyToUuid', uuid);
  },

  [MSG_THREAD_CANCEL_REPLY_TO](state) {
    return state.set('replyToUuid', null);
  },

  [MSG_THREAD_SET_MESSAGE_TEXT](state, { text }) {
    return state.set('messageText', text || '');
  },

  [MSG_THREAD_ADD_MESSAGE_FILES](state, { files }) {
    const arrFiles = [].slice.call(files); // convert to Array

    return state.update('messageFiles', (arr) => arr.concat(arrFiles));
  },

  [MSG_THREAD_REMOVE_MESSAGE_FILE](state, { file }) {
    return state.update('messageFiles', (arr) => arr.filter((f) => f !== file));
  },

  [MSG_THREAD_RESET_FORM](state) {
    return state.merge({
      messageText: '',
      messageFiles: [],
    });
  },

  [MSG_PUSHER_DELETE_MSGS](state, { deletedUuids }) {
    return state.update(
      'selectedUuids',
      Set(),
      (s) => s.filterNot((uuid) => deletedUuids.includes(uuid))
    );
  },

  [MSG_PUSHER_DELETE_USER_MSGS](state, { deletedUuids }) {
    return state.update(
      'selectedUuids',
      Set(),
      (s) => s.filterNot((uuid) => deletedUuids.includes(uuid))
    );
  },
};

export default createReducer(initialState, actionMap);
