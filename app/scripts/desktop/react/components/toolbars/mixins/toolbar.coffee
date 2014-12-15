MOUSE_LEAVE_TIMEOUT = 300

CLOSED_STATE          = 'closed'
OPENED_BY_HOVER_STATE = 'openedByHover'
OPENED_BY_CLICK_STATE = 'openedByClick'

ToolbarMixin =

  getInitialState: ->
    currentState: CLOSED_STATE

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  isClosedState:        -> @state.currentState is CLOSED_STATE
  isOpenedByClickState: -> @state.currentState is OPENED_BY_CLICK_STATE
  isOpenedByHoverState: -> @state.currentState is OPENED_BY_HOVER_STATE

  activateClosedState:        -> @setState(currentState: CLOSED_STATE)
  activateOpenedByHoverState: -> @setState(currentState: OPENED_BY_HOVER_STATE)

  handleClick: ->
    switch @state.currentState
      when CLOSED_STATE          then @setState(currentState: OPENED_BY_CLICK_STATE)
      when OPENED_BY_CLICK_STATE then @setState(currentState: CLOSED_STATE)
      when OPENED_BY_HOVER_STATE then @setState(currentState: CLOSED_STATE)
      else console.error? 'Unknown state.currentState', @state.currentState

  handleMouseEnter: ->
    clearTimeout @timeout if @timeout?

    @activateOpenedByHoverState() if @isClosedState()

  handleMouseLeave: ->
    if @isOpenedByHoverState()
      @timeout = setTimeout @activateClosedState, MOUSE_LEAVE_TIMEOUT

module.exports = ToolbarMixin