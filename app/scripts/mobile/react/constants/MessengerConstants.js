import keyMirror from 'keymirror';

const MessengerConstants = keyMirror({
  INIT_CONVERSATIONS: null,
  CREATE_CONVERSATION: null,
  LOAD_MESSAGES: null,
  READ_MESSAGES: null,
  OPEN_CONVERSATION: null,
  CREATE_LOCAL_MESSAGE: null,
  CREATE_REMOTE_MESSAGE: null,
  CREATE_REMOTE_MESSAGE_FAIL: null,
});

export const PUBLIC_CONVERSATION = 'PublicConversation';
export const PRIVATE_CONVERSATION = 'PrivateConversation';
export const GROUP_CONVERSATION = 'GroupConversation';

export default MessengerConstants;
