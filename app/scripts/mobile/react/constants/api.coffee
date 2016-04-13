keyMirror = require 'keymirror'

ApiConstants = keyMirror
  FOLLOW_USER:                null
  UNFOLLOW_USER:              null
  CANCEL_USER:                null
  IGNORE_USER:                null
  REPORT_USER:                null
  ADD_TO_FAVORITES:           null
  REMOVE_FROM_FAVORITES:      null
  START_WATCH:                null
  STOP_WATCH:                 null
  REPORT:                     null
  DELETE:                     null
  VOTE:                       null
  LOAD_COMMENTS:              null
  DELETE_COMMENT:             null
  REPORT_COMMENT:             null
  CREATE_COMMENT:             null
  EDIT_COMMENT:               null
  LOAD_FEED_ENTRIES:          null
  LOAD_TLOG_ENTRIES:          null
  SIGN_IN:                    null
  SIGN_UP:                    null
  RECOVER:                    null
  UPDATE_CURRENT_USER:        null
  CANCEL_EMAIL_CONFIRMATION:  null
  UPDATE_CURRENT_USER_AVATAR: null
  USERS_PREDICT:              null
  LOAD_NOTIFICATIONS:         null
  READ_NOTIFICATIONS:         null
  LOAD_MESSAGES:              null
  CREATE_MESSAGE:             null
  READ_MESSAGES:              null
  READY_TO_MESSAGING:         null
  SUPPORT_REQUEST:            null
  FLOWS_GET:                  null

module.exports = ApiConstants
