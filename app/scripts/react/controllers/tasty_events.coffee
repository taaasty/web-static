window.TastyEvents = new EventEmitter()

TastyEvents.keys =
  follow_status_changed: (tlogId) -> "follow_status:#{ tlogId }:changed"
  hero_closed:                    -> "hero:closed"
  comment_replied:      (entryId) -> "comment:#{entryId}:replied"
  open_comment_form:    (entryId) -> "comment_form:#{entryId}:open"