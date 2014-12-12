###* @jsx React.DOM ###

STATE_LOADING    = 'loading'
STATE_READY      = 'ready'

CLASSNAME_READY  = '__ready'
CLASSNAME_ACTIVE = '__active'

DELAY_SLIDESHOW  = 8000

window.ScreenViewer = React.createClass
  propTypes:
    title:        React.PropTypes.string
    sourceImages: React.PropTypes.array.isRequired

  getInitialState: ->
    currentState: STATE_LOADING
    images:       []

  componentDidMount: ->
    @loadImages()

  render: ->
    viewerContent = switch @state.currentState
      when STATE_LOADING then `<ScreenViewer_Loader />`
      when STATE_READY then `<ScreenViewer_Slideshow images={ this.state.images } />`
      else console.warn 'Неизвестное состояние #{@state.currentState}'

    if @props.title?
      viewerTitle = `<ScreenViewer_Title title={ this.props.title } />`

    if @state.currentState is STATE_READY
      readyClass = CLASSNAME_READY
    else
      readyClass = ''

    return `<div className={ 'screen-viewer ' + readyClass }>
              <div className='screen-viewer__spacer' />
              { viewerContent }
              { viewerTitle }
            </div>`

  loadImages: ->
    _.each @props.sourceImages, (sourceImage) =>
      image = new Image
      image.src = sourceImage.imgSrc
      image.onload = =>
        images = @state.images
        images.push({
          isAnimate: false
          imgSrc:    sourceImage.imgSrc,
          tlogUrl:   sourceImage.tlogUrl,
          userName:  sourceImage.userName
        })

        @setState {
          images:       images
          currentState: STATE_READY
        }


window.ScreenViewer_Slideshow = React.createClass
  propTypes:
    images: React.PropTypes.array.isRequired

  getInitialState: ->
    index:        0
    currentImage: @props.images[0]

  componentDidMount: ->
    @startTimeout()

  render: ->
    items = @props.images.map (image, index) =>
      isActive = @state.index == index
      return `<ScreenViewer_Item key={ index }
                                 isActive={ isActive }
                                 imgSrc={ image.imgSrc }
                                 userName={ image.userName }
                                 tlogUrl={ image.tlogUrl } />`

    return `<div className="screen-viewer__slideshow">
              { items }
            </div>`

  startTimeout: ->
    setTimeout (=>
      @nextImage()
      @startTimeout()
    ), DELAY_SLIDESHOW

  nextImage: ->
    if @state.index == @props.images.length - 1
      nextIndex = 0
    else
      nextIndex = @state.index + 1

    @setState index: nextIndex


window.ScreenViewer_Item = React.createClass
  propTypes:
    isActive: React.PropTypes.bool.isRequired
    imgSrc:   React.PropTypes.string.isRequired
    tlogUrl:  React.PropTypes.string.isRequired
    userName: React.PropTypes.string.isRequired

  render: ->
    classActive = if @props.isActive then CLASSNAME_ACTIVE else ''

    style = "background-image": "url(#{@props.imgSrc})"

    return `<div className={ 'screen-viewer__item ' + classActive }>
              <div style={ style }
                   className='screen-viewer__bg'>
              </div>
              <div className='screen-viewer__user'>
                <a href={ this.props.tlogUrl }
                   title={ this.props.userName }>
                    Фотография – { this.props.userName }
                </a>
              </div>
            </div>`


window.ScreenViewer_Loader = React.createClass
  render: ->
    `<div className='screen-viewer__loader'>
      <Spinner size={ 24 } />
    </div>`


window.ScreenViewer_Title = React.createClass
  propTypes:
    title: React.PropTypes.string

  render: ->
    `<div className='screen-viewer__title'>{ this.props.title }</div>`