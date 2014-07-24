###* @jsx React.DOM ###

window.PostEditor_ImageEditor = React.createClass
  mixins:    [React.addons.PureRenderMixin, PostEditor_Dragging, ReactActivitiesUser, PostEditor_ImagesForm]
  propTypes:
    entry:             React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  getInitialState: ->
    images:     @getInitialImages()
    isChanged:  false

  getInitialImages: ->
    @props.entry.image_attachments.map (imageAttachment) ->
      image = new Image()
      image.src = imageAttachment.image.url
      image

  clearImages: -> @setState images: [], progress: 0, isChanged: true

  data: ->
    title: @refs.titleEditor.content()

  getMediaBoxState: ->
    return 'drag-hover' if @state.isDragging

    if @state.images.length > 0
      'loaded'
    else
      null

  render: ->
    cx = React.addons.classSet post: true, 'post--image': true, 'post--edit': true, 'state--loading': @hasActivities()

    mediaBoxState = @getMediaBoxState()

    mediaBoxContent = []

    #if mediaBoxState == 'loaded'
    onDelete = @clearImages

    `<article className={cx}>
      <div className="post__content">
        <form ref='form' encType='multipart/form-data' method="POST">
          <MediaBox_Layout type='image' state={mediaBoxState} ref='layout'>
            <ImagesMediaBox_Welcome ref='welcome' isDragging={this.state.isDragging}/>
            <ImagesMediaBox_Loaded images={this.state.images} onDelete={onDelete} key='images' />
            <MediaBox_LoadingProgress progress={this.state.uploadingProgress} />
          </MediaBox_Layout>

          <TastyEditor placeholder="Придумайте подпись, примерно 280 символов (не обязательно)"
                       ref="titleEditor"
                       mode="rich"
                       content={this.props.entry.title}/>
        </form>
      </div>
    </article>`

