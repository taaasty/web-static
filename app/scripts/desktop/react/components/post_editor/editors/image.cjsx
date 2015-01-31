cx              = require 'react/lib/cx'
PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

WELCOME_MODE  = 'welcome'
LOADED_MODE   = 'loaded'
INSERT_MODE   = 'insert'

window.PostEditor_ImageEditor = React.createClass
  mixins: ['ReactActivitiesUser', PostEditor_ImagesForm, PostEditor_Dragging
            PostEditor_AutosaveMixin, RequesterMixin, PureRenderMixin
            ComponentManipulationsMixin]

  propTypes:
    normalizedEntry: React.PropTypes.instanceOf(NormalizedEntry).isRequired
    entryPrivacy:    React.PropTypes.string.isRequired

  getInitialState: ->
    currentState: @_getInitialCurrentState()
    images:       @_getInitialImages()
    imageUrl:     @entryImageUrl()

  render: ->
    imageEditorClasses = cx
      'post':        true
      'post--image': true
      'post--edit':  true
      'state--loading': @hasActivities()
      'state--insert':  @isInsertMode()

    switch @state.currentState
      when WELCOME_MODE
        imageEditor = <MediaBox_ImageWelcome ref="welcome"
                                             onClick={ this.activateInsertMode } />
      when INSERT_MODE
        imageEditor = <ImagesMediaBox_UrlInsert ref="insert"
                                                imageUrl={ this.state.imageUrl }
                                                onExit={ this.activateWelcomeMode }
                                                onChange={ this.handleChangeImageUrl } />
      when LOADED_MODE
        imageEditor = <ImagesMediaBox_Loaded images={ this.state.images }
                                             onDelete={ this.handleDeleteLoadedImages } />
      else console.error 'Неизвестный тип currentState', @state.currentState

    return <article className={ imageEditorClasses }>
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
                              placeholder={ i18n.t('editor_description_placeholder') }
                              content={ this._getTitle() }
                              isLoading={ this.hasActivities() }
                              onChange={ this.startAutosave } />
               </form>
             </div>
           </article>

  imageAttachments: -> @props.normalizedEntry.imageAttachments || []

  entryImageUrl: -> @props.normalizedEntry.embedUrl

  activateWelcomeMode: -> @setState currentState: WELCOME_MODE
  activateLoadedMode:  -> @setState currentState: LOADED_MODE
  activateInsertMode:  -> @setState currentState: INSERT_MODE

  isWelcomeMode: -> @state.currentState is WELCOME_MODE
  isLoadedMode:  -> @state.currentState is LOADED_MODE
  isInsertMode:  -> @state.currentState is INSERT_MODE

  _getInitialCurrentState: ->
    # Возможные варианты currentState: welcome, loaded, insert

    if @entryImageUrl() || @imageAttachments().length > 0
      LOADED_MODE
    else
      WELCOME_MODE

  _getInitialImages: ->
    if @entryImageUrl()?
      image     = new Image()
      image.src = @entryImageUrl()

      [image]
    else if @imageAttachments()[0] instanceof HTMLImageElement
      @imageAttachments()
    else
      @imageAttachments().map (imageAttachment) ->
        image     = new Image()
        image.src = imageAttachment.image.url

        image

  _getMediaBoxState: ->
    return 'drag-hover' if @state.isDragging
    return 'insert'     if @isInsertMode()
    return 'loaded'     if @state.images.length > 0

  _getTitle: -> @props.normalizedEntry.data2

  _getNormalizedData: ->
    data2:    @refs.titleEditor.content()
    embedUrl: @state.imageUrl
    # imageAttachments: @state.images

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
      TastyNotifyController.notifyError i18n.t 'editor_image_doesnt_exist', {imageUrl}

    image.src = imageUrl