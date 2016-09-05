export const MSG_THREAD_STOP_SELECT = 'MSG_THREAD_STOP_SELECT';
export const MSG_THREAD_START_SELECT = 'MSG_THREAD_START_SELECT';
export const MSG_THREAD_RESET_SELECTION = 'MSG_THREAD_RESET_SELECTION';
export const MSG_THREAD_TOGGLE_SELECTION = 'MSG_THREAD_TOGGLE_SELECTION';
export const MSG_THREAD_SET_REPLY_TO = 'MSG_THREAD_SET_REPLY_TO';
export const MSG_THREAD_CANCEL_REPLY_TO = 'MSG_THREAD_CANCEL_REPLY_TO';
export const MSG_THREAD_SET_AT_BOTTOM = 'MSG_THREAD_SET_AT_BOTTOM';
export const MSG_THREAD_SET_DIVIDER_VISIBLE = 'MSG_THREAD_SET_DIVIDER_VISIBLE';
export const MSG_THREAD_SET_UNREAD_BUTTON_VISIBLE =
  'MSG_THREAD_SET_UNREAD_BUTTON_VISIBLE';

export const MSG_THREAD_RESET_FORM = 'MSG_THREAD_RESET_FORM';
export const MSG_THREAD_SET_MESSAGE_TEXT = 'MSG_THREAD_SET_MESSAGE_TEXT';
export const MSG_THREAD_ADD_MESSAGE_FILES = 'MSG_THREAD_ADD_MESSAGE_FILES';
export const MSG_THREAD_REMOVE_MESSAGE_FILE = 'MSG_THREAD_REMOVE_MESSAGE_FILE';

export function setAtBottom(flag) {
  return {
    type: MSG_THREAD_SET_AT_BOTTOM,
    flag,
  };
}

export function setIsUnreadButtonVisible(flag) {
  return {
    type: MSG_THREAD_SET_UNREAD_BUTTON_VISIBLE,
    flag,
  };
}

export function setIsDividerVisible(flag) {
  return {
    type: MSG_THREAD_SET_DIVIDER_VISIBLE,
    flag,
  };
}

export function startSelect() {
  return (dispatch) => {
    dispatch(resetSelect());

    return dispatch({
      type: MSG_THREAD_START_SELECT,
    });
  };
}

export function stopSelect() {
  return (dispatch) => {
    dispatch(resetSelect());

    return dispatch({
      type: MSG_THREAD_STOP_SELECT,
    });
  };
}

export function resetSelect() {
  return {
    type: MSG_THREAD_RESET_SELECTION,
  };
}

export function toggleSelection(uuid) {
  return {
    type: MSG_THREAD_TOGGLE_SELECTION,
    uuid,
  };
}

export function setReplyToUuid(uuid) {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_THREAD_SET_REPLY_TO,
      uuid,
    });
  };
}

export function cancelReplyTo() {
  return {
    type: MSG_THREAD_CANCEL_REPLY_TO,
  };
}

export function setMessageText(text) {
  return {
    type: MSG_THREAD_SET_MESSAGE_TEXT,
    text,
  };
}

export function addMessageFiles(files) {
  return {
    type: MSG_THREAD_ADD_MESSAGE_FILES,
    files,
  };
}

export function removeMessageFile(file) {
  return {
    type: MSG_THREAD_REMOVE_MESSAGE_FILE,
    file,
  };
}

export function resetThreadForm() {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_THREAD_RESET_FORM,
    });
  };
}
