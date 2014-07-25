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