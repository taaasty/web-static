window.TastyEvents = new EventEmitter()

TastyEvents.keys =
  follow_status_changed: (tlogId) -> "follow_status:#{ tlogId }:changed"
  hero_closed: -> "hero:closed"