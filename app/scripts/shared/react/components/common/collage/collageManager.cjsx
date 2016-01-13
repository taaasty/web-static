Collage = require './collage'
{ findDOMNode } = require 'react-dom';
{ PropTypes } = React

MARGIN         = 0
MIN_ROW_HEIGHT = 150

CollageManager = React.createClass
  displayName: 'CollageManager'

  propTypes:
    images: PropTypes.array.isRequired
    width: PropTypes.number
    margin: PropTypes.number
    minRowHeight: PropTypes.number
    recalculation: PropTypes.bool

  getDefaultProps: ->
    margin:       MARGIN
    minRowHeight: MIN_ROW_HEIGHT

  getInitialState: ->
    width: @props.width || null

  componentDidMount: ->
    @updateWidthState() unless @props.width

    if @props.recalculation
      window.addEventListener 'resize', @updateWidthState

  componentWillUnmount: ->
    if @props.recalculation
      window.removeEventListener 'resize', @updateWidthState

  render: ->
    #We can get access to parentNode when returning span instead of null
    if @hasWidth() then <Collage {...@props} width={ @state.width } /> else <span />

  hasWidth: ->
    @state.width?

  updateWidthState: ->
    #For now we will use width of parent
    parentWidth = findDOMNode(this).parentNode.offsetWidth

    @setState(width: parentWidth + @props.margin * 2)

module.exports = CollageManager