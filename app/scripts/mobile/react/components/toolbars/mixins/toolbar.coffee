MOUSE_LEAVE_TIMEOUT = 300

CLOSED_STATE          = 'closed'
OPENED_BY_HOVER_STATE = 'openedByHover'
OPENED_BY_CLICK_STATE = 'openedByClick'

ToolbarMixin = 

  # getInitialState: ->
  #   currentState: CLOSED_STATE

  # componentWillUnmount: ->
  #   clearTimeout @timeout if @timeout


  # onClick: (e) ->
  #   switch @state.currentState
  #     when TOOLBAR_CLOSED          then @setState currentState: TOOLBAR_OPENED_BY_CLICK
  #     when TOOLBAR_OPENED_BY_CLICK then @setState currentState: TOOLBAR_CLOSED
  #     when TOOLBAR_OPENED_BY_HOVER then @setState currentState: TOOLBAR_CLOSED
  #     else console.error? "Unknown state.currentState", @state.currentState

  # onMouseEnter: (e) ->
  #   clearTimeout @timeout if @timeout?

  #   if @state.currentState == TOOLBAR_CLOSED
  #     @setState currentState: TOOLBAR_OPENED_BY_HOVER

  # onMouseLeave: ->
  #   if @state.currentState == TOOLBAR_OPENED_BY_HOVER
  #     @timeout = setTimeout ( =>
  #       @safeUpdateState currentState: TOOLBAR_CLOSED
  #     ), MOUSE_LEAVE_TIMEOUT

  # isOpen: -> @state.currentState != TOOLBAR_CLOSED

module.exports = ToolbarMixin