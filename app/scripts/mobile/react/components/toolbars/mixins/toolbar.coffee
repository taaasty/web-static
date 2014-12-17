CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

ToolbarMixin =

  getInitialState: ->
    currentState: CLOSE_STATE

  isOpenState:  -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

module.exports = ToolbarMixin