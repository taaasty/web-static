{ PropTypes } = React

CollageRowItem = React.createClass
  displayName: 'CollageRowItem'

  propTypes:
    width: PropTypes.number.isRequired
    height: PropTypes.number.isRequired
    margin: PropTypes.number
    imageUrl: PropTypes.string.isRequired
    imagePath: PropTypes.string

  getInitialState: ->
    width:  @props.width
    height: @props.height

  render: ->
    <div style={ @getContainerStyles() } className="collage__item">
      <img src={this.getUrl()} srcSet={this.getRetinaUrl()} style={this.getImageStyles()} />
    </div>

  getContainerStyles: ->
    { width, height, margin } = @props

    { width, height, margin }

  getImageStyles: ->
    { width, height } = @props

    { width, height }

  getUrl: ->
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

  getRetinaUrl: ->
    { width, height } = @state

    if @props.imageUrl and @props.imagePath
      # Картинка есть на сервере
      ThumborService.retinaImageUrl({
        url: @props.imageUrl,
        path: @props.imagePath,
        size: { width, height }
      });
    else
      # Картинка выводится из blob
      @props.imageUrl

module.exports = CollageRowItem