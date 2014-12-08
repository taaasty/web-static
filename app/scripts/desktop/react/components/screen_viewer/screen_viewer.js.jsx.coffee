###* @jsx React.DOM ###

LOADING_STATE = 'loading'
READY_STATE = 'ready'

window.ScreenViewer = React.createClass
  PropTypes:
    text: React.PropTypes.string
    sourceImages: React.PropTypes.array.isRequired

  getInitialState: ->
    currentState: LOADING_STATE
    images: []

  componentDidMount: ->
    _.each @props.sourceImages, (sourceImage) =>
      image = new Image
      image.src = sourceImage.imgSrc
      image.onload = =>
        images = @state.images
        images.push({
          imgSrc: sourceImage.imgSrc,
          tlogUrl: sourceImage.tlogUrl,
          userName: sourceImage.userName
        })
        @setState images: images
        @setState currentState: READY_STATE

  render: ->
    viewerContent = switch @state.currentState
      when LOADING_STATE
        `<ScreenViewer_Loader/>`
      when READY_STATE
        `<ScreenViewer_Showing images={ this.state.images } />`
      else console.warn "Неизвестное состояние #{@state.currentState}"

    return `<div className="screen-viewer">
              <div className='screen-viewer__spacer' />
              { viewerContent }
            </div>`


window.ScreenViewer_Showing = React.createClass
  propTypes:
    images: React.PropTypes.array.isRequired

  getInitialState: ->
    indexCurrentImage: 0
    currentImage: @props.images[0]

  componentDidMount: ->
    @startShow()

  render: ->
    `<ScreenViewer_Item imgSrc={ this.state.currentImage.imgSrc }
                        userName={ this.state.currentImage.userName }
                        tlogUrl={ this.state.currentImage.tlogUrl } />`


  startShow: ->
    console.log @state.indexCurrentImage
    @setState currentImage: @props.images[@state.indexCurrentImage]


window.ScreenViewer_Item = React.createClass
  propTypes:
    imgSrc:   React.PropTypes.string.isRequired
    tlogUrl:  React.PropTypes.string.isRequired
    userName: React.PropTypes.string.isRequired

  render: ->
    style = "background-image": "url(#{@props.imgSrc})"

    return `<div className='screen-viewer__item state--active'>
              <div style={ style }
                   className='screen-viewer__bg'>
              </div>
              <div className='screen-viewer__user'>
                <a href={ this.props.tlogUrl }
                   title={ this.props.userName }>Фотография – { this.props.userName }</a>
              </div>
            </div>`


window.ScreenViewer_Loader = React.createClass
  render: ->
    return `<div className='screen-viewer__loader'>
              <Spinner size={ 24 } />
            </div>`


window.ScreenViewer_Text = React.createClass
  propTypes:
    text: React.PropTypes.string

  render: ->
    return `<div className='screen-viewer__title'>{ text }</div>`