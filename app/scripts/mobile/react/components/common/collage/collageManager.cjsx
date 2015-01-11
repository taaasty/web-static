Collage = require './collage'
{ PropTypes } = React

MARGIN = 3

CollageManager = React.createClass
  displayName: 'CollageManager'

  propTypes:
    images: PropTypes.array.isRequired
    width:  PropTypes.number
    margin: PropTypes.number

  getDefaultProps: ->
    margin: MARGIN

  getInitialState: ->
    width: @props.width || null

  componentDidMount: ->
    @updateWidthState()

    # Doesn't need to update width state if we have onlu one image
    window.addEventListener 'resize', @updateWidthState if @props.images.length > 1

  componentWillUnmount: ->
    window.removeEventListener 'resize', @updateWidthState if @props.images.length > 1

  render: ->
    #We can get access to parentNode when returning span instead of null
    if @hasWidth() then <Collage {...@props} width={ @state.width } /> else <span />

  hasWidth: ->
    @state.width?

  updateWidthState: ->
    #For now we will use width of parent
    parentWidth = @getDOMNode().parentNode.offsetWidth

    @setState(width: parentWidth - @props.margin * 2)

module.exports = CollageManager