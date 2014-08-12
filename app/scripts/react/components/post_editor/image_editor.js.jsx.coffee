###* @jsx React.DOM ###

window.PostEditor_ImageEditor = React.createClass
  mixins: [
    React.addons.PureRenderMixin,
    PostEditor_Dragging,
    'ReactActivitiesUser',
    PostEditor_ImagesForm,
    RequesterMixin
  ]

  propTypes:
    entry:             React.PropTypes.object.isRequired
    entryPrivacy:      React.PropTypes.string.isRequired
    doneCallback:      React.PropTypes.func.isRequired
    onChanging:        React.PropTypes.func.isRequired

  getInitialState: ->
    images:      @getInitialImages()
    imageUrl:    @props.entry.image_url
    isInserting: false
    isChanged:   false

  getInitialImages: ->
    if @props.entry.image_url?
      image = new Image()
      image.src = @props.entry.image_url
      [image]
    else
      @props.entry.image_attachments.map (imageAttachment) ->
        image = new Image()
        image.src = imageAttachment.image.url
        image

  clearImages: -> @setState images: [], progress: 0, isChanged: true

  clickInsertUrl: ->
    @setState isInserting: true

  data: ->
    title:     @refs.titleEditor.content()
    image_url: @state.imageUrl
    privacy:   @props.entryPrivacy

  getMediaBoxState: ->
    # TODO Непонятно кто и как устанавливает этот state
    return 'drag-hover' if @state.isDragging

    return 'insert' if @state.isInserting

    if @state.images.length > 0
      'loaded'
    else
      null

  onChangeImageUrl: (imageUrl) ->

    images = []
    if imageUrl?
      image = new Image()
      image.src = imageUrl
      images = [image]

    @setState imageUrl: imageUrl, images: images, isInserting: false

  exitFromInserting: ->
    @setState isInserting: false

  render: ->
    cx = React.addons.classSet post: true,
        'post--image': true,
        'post--edit': true,
        'state--loading': @hasActivities(),
        'state--insert':  @state.isInserting

    mediaBoxState = @getMediaBoxState()

    mediaBoxContent = []

    #console.log 'image editor activities:', @hasActivities()
    #console.log 'image editor state:', mediaBoxState
    #console.log 'image editor images:', this.state.images

    #if mediaBoxState == 'loaded'
    onDelete = @clearImages

    mediaElements = []

    mediaElements.push `<ImagesMediaBox_Welcome ref='welcome' key='welcome'
                                    onClickUrlInsert={this.clickInsertUrl}
                                    isDragging={this.state.isDragging}/>`

    mediaElements.push `<ImagesMediaBox_Loaded images={this.state.images} onDelete={onDelete} key='images'/>`

    if @state.isInserting
      mediaElements.push `<ImagesMediaBox_UrlInsert
                        imageUrl={this.state.imageUrl}
                        onExit={this.exitFromInserting}
                        onChangeImageUrl={this.onChangeImageUrl}
                        key='insert' ref='insert'/>`

    `<article className={cx}>
      <div className="post__content">
        <form ref='form' encType='multipart/form-data' method="POST">
          <MediaBox_Layout type='image' state={mediaBoxState} ref='layout'>
            {mediaElements}
            <MediaBox_LoadingProgress progress={this.state.uploadingProgress} />
          </MediaBox_Layout>

          <TastyEditor placeholder="Придумайте подпись, примерно 280 символов (не обязательно)"
                       onChange={this.getChangeCallback('title')}
                       ref="titleEditor"
                       mode="rich"
                       content={this.props.entry.title}/>
        </form>
      </div>
    </article>`

