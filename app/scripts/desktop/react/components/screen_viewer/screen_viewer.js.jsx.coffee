###* @jsx React.DOM ###

window.ScreenViewer = React.createClass
  PropTypes:
    mainText: React.PropTypes.string
    items:    React.PropTypes.array.isRequired

  getInitialState: ->
    index: 0
    indexLoadableItem: 0
    loadedItems: []

    numberLoadableSlide: 0
    currentImage: null
    images: []
    isStarted: false

  componentWillMount: ->
    @images = []
    #@loadImages()
    @_loadImage()

  render: ->
    srcImg = @state.currentImage
    #console.log @state.numberLoadableSlide
    console.log @state
    console.log srcImg

    return `<div className="screen-viewer">
              <ScreenViewerItem srcImg={ srcImg }
                                userName="volosojui"
                                tlogUrl="@volosojui">
              </ScreenViewerItem>
            </div>`

  _loadImages: ->


  loadImages: ->
    context = this

    if @state.numberLoadableSlide < @props.items.length

      currentSrcImg = @props.items[@state.numberLoadableSlide].srcImg

      # Загружаем картинку
      # arg1 - ссылка на картинку
      # arg1 - колбэк, если картинка успешно загрузилась
      ScreenViewerController.loadImage currentSrcImg, ->
        context.images.push(currentSrcImg)

        #console.log currentSrcImg

        context.setState currentImage: currentSrcImg

        #context.setState isStarted: true

        if nextLoadableSlide < context.props.items.length -1
          nextLoadableSlide = context.state.numberLoadableSlide + 1
          context.setState numberLoadableSlide: nextLoadableSlide

        context.loadImages()

  _loadImage: ->
    self = @

    currentItem = @props.items[@state.indexLoadableItem]
    console.log currentItem

    _loadedItems = self.state.loadedItems

    ScreenViewerController._loadImage currentItem.srcImg, ->
      console.log 'laod'
      _loadedItems.push currentItem
      _loadedItems.push {'1': 'log'}
      self.setState loadedItems: _loadedItems