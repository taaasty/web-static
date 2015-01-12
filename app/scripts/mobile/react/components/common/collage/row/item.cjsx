{ PropTypes } = React

CollageItem = React.createClass
  displayName: 'CollageItem'

  propTypes:
    width:    PropTypes.number.isRequired
    height:   PropTypes.number.isRequired
    margin:   PropTypes.number
    imageUrl: PropTypes.string.isRequired

  getInitialState: ->
    width:  @props.width
    height: @props.height

  render: ->
    <div style={ @getContainerStyles() }
         className="collage__item">
      <img style={ @getImageStyles() }
           src={ @getImageUrl() } />
    </div>

  getContainerStyles: ->
    { width, height, margin } = @props

    { width, height, margin }

  getImageStyles: ->
    { width, height, margin } = @props

    { width, height }

  getImageUrl: ->
    { width, height } = @state

    #FIXME: Probably will be better if pixelRation will compute in ThumborService
    width  *= window.devicePixelRatio
    height *= window.devicePixelRatio

    ThumborService.image_url @props.imageUrl, width + 'x' + height

module.exports = CollageItem