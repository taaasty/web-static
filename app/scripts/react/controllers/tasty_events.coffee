window.TastyEvents = new EventEmitter()

TastyEvents.keys =
  follow_status_changed:               (tlogId) -> "follow_status:#{ tlogId }:changed"
  hero_closed:                                  -> "hero:closed"
  comment_replied:                    (entryId) -> "comment:#{ entryId }:replied"
  comment_form_toggled:                         -> "comment_form:toggled"
  user_property_changed: (propertyName, userId) -> "#{ propertyName }:#{ userId }:changed"
  command_current_notification_hide:            -> "command:current_notification:hide"
  message_list_scrolled:                        -> "message_list:scrolled"
  user_toolbar_closed:                          -> "user_toolbar:closed"
  user_toolbar_opened:                          -> "user_toolbar:opened"

  command_hero_open:                            -> "command:hero:open"
  command_settings_open:                        -> "command:settings:open"
  command_requests_open:                        -> "command:requests:open"