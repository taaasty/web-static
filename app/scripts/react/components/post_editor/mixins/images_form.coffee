ACCEPT_FILE_TYPES = /(\.|\/)(gif|jpe?g|png)$/i
MAX_FILE_SIZE    = 10*1000*1000
MAX_NUMBER_OF_FILES = 6

window.PostEditor_ImagesForm=
  getInitialState: ->
    uploadingProgress: 0

  componentDidMount: ->
    @prepareForm()

  # Похоже fileupload криво дестроится
  # и потом не привязывается и input не ловит файлы/
  #
  #componentWillUnmount: ->
    #console.log 'images form will unmount'
    #$form = $ @refs.form.getDOMNode()
    #$form.fileupload 'destory'

  saveEntry: ->
    if @fileUploader
      @fileUploader.submit()
    else
      # TODO Сохранять через обычный запрос
      alert "Картинки не меняли, сохранять нечего"

  prepareForm: ->
    $form = $ @refs.form.getDOMNode()

    #fileInput = @refs.welcome.refs.input.getDOMNode()

    @fileUploader = null

    ffu = $form.fileupload
      url:               @savingUrl()
      dataType:          'json'
      acceptFileTypes:   ACCEPT_FILE_TYPES
      maxFileSize:       MAX_FILE_SIZE
      maxNumberOfFiles:  MAX_NUMBER_OF_FILES
      multipart:         true
      singleFileUploads: false
      autoUpload:        false
      replaceFileInput:  false
      #fileInput:         fileInput
      start: =>
        console.log 'start'
        @incrementActivities()
      stop: =>
        console.log 'stop'
        @decrementActivities()
        @setState uploadingProgress: 0
      
      fail:        (e, data) => TastyNotifyController.errorResponse data

      dragover:    (e, data) => @dragOver()
      progressall: (e, data) =>
        progress = parseInt(data.loaded / data.total * 100, 10)
        @setState uploadingProgress: progress

      add:                   @addFileToForm

      formData: (form)       => @serializeArray @data()

  serializeArray: (data) ->
    return _.keys(data).map (key) ->  name: key,  value: data[key]

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
  savingUrl: ->
    if @props.entry.id?
      Routes.api.update_entry_url @props.entry
    else
      Routes.api.create_entry_url 'image'

