###* @jsx React.DOM ###

window.ScreenViewer = React.createClass
  PropTypes:
    text:    React.PropTypes.string
    screens: React.PropTypes.array.isRequired

  getInitialState: ->
    numberLoadableSlide: 0
    currentImage: null
    images: []
    isStarted: false

  componentWillMount: ->
    @images = []
    @loadImages()

  render: ->
    srcImg = @state.currentImage
    #console.log @state.numberLoadableSlide

    console.log srcImg

    return `<div className="loaded-files">
              <ScreenViewerItem srcImg={ srcImg }
                                userName="volosojui"
                                tlogUrl="@volosojui">
              </ScreenViewerItem>
            </div>`

  loadImages: ->
    context = this

    if @state.numberLoadableSlide < @props.screens.length

      currentSrcImg = @props.screens[@state.numberLoadableSlide].srcImg

      # Загружаем картинку
      # arg1 - ссылка на картинку
      # arg1 - колбэк, если картинка успешно загрузилась
      ScreenViewerController.loadImage currentSrcImg, ->
        context.images.push(currentSrcImg)

        #console.log currentSrcImg

        context.setState currentImage: currentSrcImg

        #context.setState isStarted: true

        if nextLoadableSlide < context.props.screens.length -1
          nextLoadableSlide = context.state.numberLoadableSlide + 1
          context.setState numberLoadableSlide: nextLoadableSlide

        context.loadImages()