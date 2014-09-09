###* @jsx React.DOM ###

WELCOME_MODE = 'welcome'
LOADED_MODE  = 'loaded'
INSERT_MODE  = 'insert'

window.PostEditor_ImageEditor = React.createClass
  mixins: ['ReactActivitiesUser', PostEditor_ImagesForm, PostEditor_Dragging
            RequesterMixin, React.addons.PureRenderMixin, ComponentManipulationsMixin]

  propTypes:
    entryPrivacy:          React.PropTypes.string.isRequired
    entryTitle:            React.PropTypes.string
    entryImageUrl:         React.PropTypes.string
    entryImageAttachments: React.PropTypes.array

  getInitialState: ->
    currentState: @_getInitialCurrentState()
    images:       @_getInitialImages()
    imageUrl:     @props.entryImageUrl

  render: ->
    imageEditorClasses = React.addons.classSet {
      'post':        true
      'post--image': true
      'post--edit':  true
      'state--loading': @hasActivities()
      'state--insert':  @isInsertMode()
    }

    switch @state.currentState
      when WELCOME_MODE
        imageEditor = `<MediaBox_ImageWelcome ref="welcome"
                                              onClick={ this.activateInsertMode } />`
      when INSERT_MODE
        imageEditor = `<ImagesMediaBox_UrlInsert ref="insert"
                                                 imageUrl={ this.state.imageUrl }
                                                 onExit={ this.activateWelcomeMode }
                                                 onChange={ this.handleChangeImageUrl } />`
      when LOADED_MODE
        imageEditor = `<ImagesMediaBox_Loaded images={ this.state.images }
                                              onDelete={ this.handleDeleteLoadedImages } />`
      else console.error 'Неизвестный тип currentState', @state.currentState

    return `<article className={ imageEditorClasses }>
              <div className="post__content">
                <form ref="form"
                      encType="multipart/form-data">

                  <MediaBox_Layout ref="layout"
                                   state={ this._getMediaBoxState() }
                                   type="image">
                    { imageEditor }
                    <MediaBox_LoadingProgress progress={ this.state.uploadingProgress } />
                  </MediaBox_Layout>

                  <TastyEditor ref="titleEditor"
                               mode="rich"
                               placeholder="Придумайте подпись"
                               content={ this.props.entryTitle }
                               isLoading={ this.hasActivities() } />
                </form>
              </div>
            </article>`

  storeEntry: ->
    EntryStoreService.storeEntry @_getNormalizedData()

  activateWelcomeMode: -> @setState currentState: WELCOME_MODE
  activateLoadedMode:  -> @setState currentState: LOADED_MODE
  activateInsertMode:  -> @setState currentState: INSERT_MODE

  isWelcomeMode: -> @state.currentState is WELCOME_MODE
  isLoadedMode:  -> @state.currentState is LOADED_MODE
  isInsertMode:  -> @state.currentState is INSERT_MODE

  _getInitialCurrentState: ->
    # Возможные варианты currentState: welcome, loaded, insert

    if @props.entryImageUrl || @props.entryImageAttachments.length > 0
      LOADED_MODE
    else
      WELCOME_MODE

  _getInitialImages: ->
    if @props.entryImageUrl?
      image     = new Image()
      image.src = @props.entryImageUrl

      [image]
    else if @props.entryImageAttachments[0] instanceof HTMLImageElement
      @props.entryImageAttachments
    else
      @props.entryImageAttachments.map (imageAttachment) ->
        image     = new Image()
        image.src = imageAttachment.image.url

        image

  _getMediaBoxState: ->
    return 'drag-hover' if @state.isDragging
    return 'insert'     if @isInsertMode()
    return 'loaded'     if @state.images.length > 0

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      type:              'image'
      title:             @refs.titleEditor.content()
      image_url:         @state.imageUrl
      image_attachments: @state.images
    }

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      title:     @refs.titleEditor.content()
      image_url: @state.imageUrl
      privacy:   @props.entryPrivacy
    }

  handleDeleteLoadedImages: ->
    @setState {
      images:   []
      imageUrl: null
    }
    @activateWelcomeMode()

  handleChangeImageUrl: (imageUrl) ->
    image  = new Image()
    images = [image]

    image.onload = =>
      @activateLoadedMode()
      @setState { imageUrl, images }
    image.onerror = =>
      TastyNotifyController.notify 'error', "Изображения #{ imageUrl } не существует."

    image.src = imageUrl

  handleChange: -> @storeEntry()