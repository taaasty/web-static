{ PropTypes } = React

Image = React.createClass
  displayName: 'Image'

  propTypes:
    image:     PropTypes.object.isRequired
    maxWidth:  PropTypes.number
    maxHeight: PropTypes.number
    className: PropTypes.string

  render: ->
    <div className={ @props.className }
         style={ @getImageProportions() }>
      <img src={ @getImageUrl() } />
    </div>

  getImageProportions: ->
    if @props.maxWidth? or @props.maxHeight?
      maxWidth  = @props.maxWidth  ? @props.maxHeight
      maxHeight = @props.maxHeight ? @props.maxWidth
      srcWidth  = @props.image.geometry.width
      srcHeight = @props.image.geometry.height

      if srcWidth > maxWidth
        ratio     = maxWidth / srcWidth
        width     = maxWidth
        height    = srcHeight * ratio
        srcHeight = srcHeight * ratio
        srcWidth  = srcWidth * ratio
      else if srcHeight > maxHeight
        ratio     = maxHeight / srcHeight
        height    = maxHeight
        width     = srcWidth * ratio
        srcWidth  = srcWidth * ratio
        srcHeight = srcHeight * ratio
      else
        width  = srcWidth
        height = srcHeight

      width  = parseInt width, 10
      height = parseInt height, 10

      {width, height}

  getImageUrl: ->
    { width, height } = @getImageProportions()

    url = ThumborService.newImageUrl(@props.image.url, { width, height });

module.exports = Image
