###* @jsx React.DOM ###

ACCEPT_FILE_TYPES = /(\.|\/)(gif|jpe?g|png)$/i
MAX_FILE_SIZE    = 10*1000*1000
MAX_NUMBER_OF_FILES = 6

window.PostEditor_ImageEditor = React.createClass
  mixins:    [React.addons.PureRenderMixin, PostEditor_PersistenceMixin, PostEditor_Dragging]

  getInitialState: ->
    isDragging: false
    progress:   0
    images:     @getInitialImages()
    isChanged:  false

  getMediaBoxState: ->
    return 'drag-hover' if @state.isDragging

    if @state.images.length > 0
      'loaded'
    else
      null

  getInitialImages: ->
    @props.entry.image_attachments.map (imageAttachment) ->
      image = new Image()
      image.src = imageAttachment.image.url
      image

  componentDidMount: ->
    @bindDragging()
    @prepareForm()

  componentWillUnmount: ->
    @unbindDragging()

  componentDidUpdate: ->
    @updateDropZoneClass @state.isDragging

  clearImages: ->
    @setState images: []

  data: ->
    title: @refs.titleEditor.content()

  prepareForm: ->
    $form = $ @refs.form.getDOMNode()

    @fileUploader = null

    $form.fileupload
      url:               @imagesSavingUrl()
      dataType:          'json'
      acceptFileTypes:   ACCEPT_FILE_TYPES
      maxFileSize:       MAX_FILE_SIZE
      maxNumberOfFiles:  MAX_NUMBER_OF_FILES
      multipart:         true
      singleFileUploads: false
      autoUpload:        false
      replaceFileInput:  false

      #fileInput:             @refs.welcome.refs.input.getDOMNode()
      send:                  => @props.setLoading true
      always:                => @props.setLoading false
      fail:        (e, data) => TastyNotifyController.errorResponse data
      dragover:    (e, data) => @dragOver()
      progressall: (e, data) =>
        progress = parseInt(data.loaded / data.total * 100, 10)
        console.log 'progress', proress
        @setState loadingProgress: progress

      add:                   @addFileToForm

      formData: (form)       => return {} # @props.entry

  addFileToForm: (e, data) ->
    console.warn 'new file uploader', data, @fileUploader if @fileUploader? && @fileUploader!=data
    @fileUploader = data
    # Когда загружается картинка через url случайно генерируется
    # это событие, но без файлов
    return if data.files.length==0
    # @post.unset 'image_url'
    
    images = data.files.map (file) ->
      image = new Image()
      image.src = window.URL.createObjectURL file
      image

    @setState images: images

      #@
      #image.onload = =>
        #images = @state.images
        #images.push image
        #@setState images: images

  # Всегда POST запросы
  imagesSavingUrl: ->
    if @props.entry.id?
      Routes.api.update_images_url @props.entry.id
    else
      Routes.api.create_entry_url 'image'

  render: ->
    console.log 'render'
    cx = React.addons.classSet post: true, 'post--image': true, 'post--edit': true, 'state--loading': @state.isLoading

    mediaBoxState = @getMediaBoxState()

    mediaBoxContent = []

    if mediaBoxState == 'loaded'
      mediaBoxContent.push ImagesMediaBox_Loaded images: @state.images, onDelete: @clearImages, key: 'images'

    `<article className={cx}>
      <div className="post__content">
        <form ref='form' encType='multipart/form-data' method="POST">
          <MediaBox_Layout type='image' state={mediaBoxState} ref='layout'>
            <ImagesMediaBox_Welcome ref='welcome' />
            {mediaBoxContent}
          </MediaBox_Layout>

          <TastyEditor placeholder="Придумайте подпись, примерно 280 символов (не обязательно)"
                       ref="titleEditor"
                       content={this.props.entry.title}/>
        </form>
      </div>
    </article>`

