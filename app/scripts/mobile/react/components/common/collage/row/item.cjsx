{ PropTypes } = React

CollageItem = React.createClass
  displayName: 'CollageItem'

  propTypes:
    image: PropTypes.object.isRequired

  render: ->
    <div className="collage__item"
         style={ @getStyles() }>
      <img src={ @getImageUrl() }
           style={ @getStyles() } />
    </div>

  getStyles: ->
    { widthCollage, heightCollage, marginCollage } = @props.image

    { width: widthCollage, height: heightCollage, margin: marginCollage }

  getImageUrl: ->
    { widthCollage, heightCollage, marginCollage } = @props.image

    if widthCollage && heightCollage
      ThumborService.image_url @props.image.payload.url, widthCollage + 'x' + heightCollage
    else
      @props.image.payload.url

module.exports = CollageItem