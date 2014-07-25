REPOSITION_TIMEOUT = 500
COMPONENT_WIDTH = 400

window.ReactPositionsMixin =
  propTypes:
    position:      React.PropTypes.object

  positionKey:       -> @props.title

  componentDidMount: ->
    @restorePosition()
    $(window).on 'resize', @checkPosition

  componentWillUnmount: ->
    $(window).off 'resize', @checkPosition

  checkPosition: ->
    currentPosition = @currentPosition()
    smartPosition =  PositionsService.smartPosition currentPosition

    if smartPosition? && smartPosition!=currentPosition
      reposition = => @setPosition smartPosition

      clearTimeout @_repositionTimeout
      @_repositionTimeout = setTimeout reposition, REPOSITION_TIMEOUT
    
  currentPosition: -> $(@getDOMNode()).position()
  defaultPosition: -> @props.position || {top: 100, left: $(window).width()-COMPONENT_WIDTH/2 }

  restorePosition: ->
    @setPosition @initialPosition()
    
  initialPosition: ->
    PositionsService.smartPosition(
      PositionsService.restorePosition(@positionKey()) ||
      @defaultPosition()
    )

  initialPositionStyle: ->
    @initialPosition()

  savePosition: (position) ->
    PositionsService.savePosition @positionKey(), position

  setPosition: (position) ->
    if position?
      $node = $ @getDOMNode()
      $node.css position
