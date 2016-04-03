keyMirror = require 'keymirror'

MessengerConstants = keyMirror
  INIT_CONVERSATIONS: null
  CREATE_CONVERSATION: null
  LOAD_MESSAGES: null
  READ_MESSAGES: null
  OPEN_CONVERSATION: null
  CREATE_LOCAL_MESSAGE: null
  CREATE_REMOTE_MESSAGE: null
  CREATE_REMOTE_MESSAGE_FAIL: null

module.exports = MessengerConstants
