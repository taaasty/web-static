CollageRowItemProgress = require './itemProgress'
{ PropTypes } = React

CollageRowItem = React.createClass
  displayName: 'CollageRowItem'

  propTypes:
    width: PropTypes.number.isRequired
    height: PropTypes.number.isRequired
    margin: PropTypes.number
    imageUrl: PropTypes.string.isRequired
    imagePath: PropTypes.string
    progress: PropTypes.number

  getInitialState: ->
    width:  @props.width
    height: @props.height

  render: ->
    <div style={ @getContainerStyles() }
         className="collage__item">
      <img style={ @getImageStyles() }
           src={ @getImageUrl() } />
      { @renderProgress() }
    </div>

  renderProgress: ->
    if @props.progress
      <CollageRowItemProgress progress={ @props.progress } />

  getContainerStyles: ->
    { width, height, margin } = @props

    { width, height, margin }

  getImageStyles: ->
    { width, height } = @props

    { width, height }

  getImageUrl: ->
    { width, height } = @state

    if @props.imageUrl and @props.imagePath
      # Картинка есть на сервере
      ThumborService.imageUrl
        url:  @props.imageUrl
        path: @props.imagePath
        size: width + 'x' + height
    else
      # Картинка выводится из blob
      @props.imageUrl

module.exports = CollageRowItem