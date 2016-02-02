LazyLoad = require('react-lazy-load').default;
ImageLoader = require('react-imageloader');
FitSpinner = require('../../FitSpinner');
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

  renderPreloader: ->
    { width, height } = this.props;

    # 28-4=24 maximum size for spinner
    <div className="collage__item-spinner" style={this.getImageStyles()}>
      <FitSpinner size={Math.min(width, height, 28)} />
    </div>

  render: ->
    imgProps = {
      srcSet: this.getRetinaUrl(),
      style: this.getImageStyles(),
    }
    
    <div style={ @getContainerStyles() } className="collage__item">
      <LazyLoad
        height={this.props.height}
        threshold={parseInt(window.innerHeight, 10)}
      >
        <ImageLoader
          imgProps={imgProps}
          preloader={this.renderPreloader}
          src={this.getUrl()}
        />
      </LazyLoad>
    </div>

  getContainerStyles: ->
    { width, height, margin } = @props

    { width, height, margin }

  getImageStyles: ->
    { width, height } = @props

    { width, height }

  getUrl: ->
    { width, height } = @state

    if this.props.imageUrl and this.props.imagePath
      # Картинка есть на сервере
      ThumborService.newImageUrl(this.props.imageUrl, { width, height })
    else
      # Картинка выводится из blob
      this.props.imageUrl

  getRetinaUrl: ->
    { width, height } = @state

    if this.props.imageUrl and this.props.imagePath
      ThumborService.newRetinaImageUrl(this.props.imageUrl, { width, height });
    else
      # Картинка выводится из blob
      this.props.imageUrl

module.exports = CollageRowItem
