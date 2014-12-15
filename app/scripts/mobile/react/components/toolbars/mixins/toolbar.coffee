MOUSE_LEAVE_TIMEOUT = 300

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

ToolbarMixin =

  getInitialState: ->
    currentState: CLOSE_STATE

  # componentDidMount: ->
  #   layout = document.querySelector '.layout'
  #   transitionEvent = BrowserHelpers.whichTransitionEvent()

  #   layout.addEventListener transitionEvent, @_onTransitionEnd

  # componentWillUnmount: ->
  #   layout = document.querySelector '.layout'
  #   transitionEvent = BrowserHelpers.whichTransitionEvent()

  #   layout.removeEventListener transitionEvent, @_onTransitionEnd

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  isCloseState: -> @state.currentState is CLOSE_STATE
  isOpenState:  -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  # _onTransitionEnd: ->
  #   @activateCloseState() if @isOpenState()

module.exports = ToolbarMixin