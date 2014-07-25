MOVE_OFFSET = 100
MIN_OFFSET = 50

STORAGE_PREFIX = 'positions:'

window.PositionsService =
  storage: window.localStorage

  savePosition: (key, position) ->
    @storage.setItem @_positionKey(key), JSON.stringify(position)

  restorePosition: (key) ->
    JSON.parse @storage.getItem @_positionKey key

  smartPosition: (position) ->
    return unless position?

    position = _.clone position

    windowWidth = $(window).width()
    windowHeight = $(window).height()

    position.top  = windowHeight - MOVE_OFFSET if position.top  > (windowHeight - MIN_OFFSET)
    position.left = windowWidth  - MOVE_OFFSET if position.left > (windowWidth  - MIN_OFFSET)

    position

  _positionKey: (key) -> STORAGE_PREFIX + ':' + key
