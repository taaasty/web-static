OFFSET_X = 50
OFFSET_Y = 50

window.PositionsController =

  storage: window.localStorage

  savePosition: (name, offset) ->
    positions = []
    persistedPositions = JSON.parse( @storage.getItem 'positions' )
    newPosition = { name, offset }

    if persistedPositions?
      index = @_getPositionIndex name, persistedPositions
      if index?
        persistedPositions[index] = newPosition
      else
        persistedPositions.push newPosition
      @storage.setItem 'positions', JSON.stringify( persistedPositions )
    else
      positions.push newPosition
      @storage.setItem 'positions', JSON.stringify( positions )

  restorePosition: (name) ->
    persistedPositions = JSON.parse( @storage.getItem 'positions' )
    index = @_getPositionIndex name, persistedPositions

    persistedPositions[index].offset if index?

  smartRestorePosition: (name) ->
    offset = @restorePosition name
    newOffset = _.clone offset
    windowWidth = $(window).width()
    windowHeight = $(window).height()

    if offset.top > windowHeight
      newOffset.top = windowHeight - OFFSET_Y
    if offset.left > windowWidth
      newOffset.left = windowWidth - OFFSET_X

    newOffset

  removePosition: (name) ->
    persistedPositions = JSON.parse( @storage.getItem 'positions' )
    index = @_getPositionIndex name, persistedPositions    

    if index?
      persistedPositions.splice index, 1
      @storage.setItem 'positions', JSON.stringify( persistedPositions )

  removeAllPositions: ->
    @storage.removeItem 'positions'

  _getPositionIndex: (name, list) ->
    return unless list?

    for position, i in list
      return i if position.name == name