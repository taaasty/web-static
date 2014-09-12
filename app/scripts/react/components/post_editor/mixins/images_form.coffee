ACCEPT_FILE_TYPES   = /(\.|\/)(gif|jpe?g|png)$/i
MAX_FILE_SIZE       = 10*1000*1000
MAX_NUMBER_OF_FILES = 6

window.PostEditor_ImagesForm =

  getInitialState: ->
    uploadingProgress: 0

  componentDidMount:    -> @_bindImageUpload()
  componentDidUpdate:   -> @_rebindImageUpload()
  componentWillUnmount: -> @_unbindImageUpload()

  entryId:        -> @props.normalizedEntry.id
  entryType:      -> 'image'
  entryUpdatedAt: -> @props.normalizedEntry.updatedAt

  saveEntry: ->
    return @saveAsAjax()          if @state.imageUrl?
    return @fileUploader.submit() if @fileUploader?

    TastyNotifyController.notify 'error', 'Вы не загрузили изображения'

  saveAsAjax: ->
    @incrementActivities()

    @createRequest
      url:    @_getSaveUrl()
      method: @_getSaveMethod()
      data:   @_getEditorData()
      success: (newEntry) =>
        @safeUpdateState {
          entry: newEntry
          type:  newEntry.type
        }
        EntryStore.removeNormalizedEntry @props.normalizedEntry
        @props.doneCallback newEntry
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

    # TODO Сохранять через обычный запрос
    # alert "Картинки не меняли, сохранять нечего"

  addFilesToForm: (e, data) ->
    @fileUploader = data

    images = data.files.map (file, i) =>
      image     = new Image()
      image.src = window.URL.createObjectURL file

      progress = parseInt((i + 1) / data.files.length * 100, 10)
      @setState uploadingProgress: progress

      image

    @setState {
      images: images
      imageUrl: null
      uploadingProgress: 0
    }

    @activateLoadedMode()

  serializeArray: (data) ->
    _.keys(data).map (key) -> { name: key, value: data[key] }

  _rebindImageUpload: ->
    @_unbindImageUpload()
    @_bindImageUpload()

  _bindImageUpload: ->
    @$uploadForm = $( @refs.form.getDOMNode() )

    @$uploadForm.fileupload
      url: @_getSaveUrl()
      dataType: 'json'
      acceptFileTypes:   ACCEPT_FILE_TYPES
      maxFileSize:       MAX_FILE_SIZE
      maxNumberOfFiles:  MAX_NUMBER_OF_FILES
      multipart:         true
      singleFileUploads: false
      autoUpload:        false
      replaceFileInput:  false
      pasteZone:         null
      add: @addFilesToForm
      formData: (form) =>
        @serializeArray @_getEditorData()
      start: => @incrementActivities()
      progressall: (e, data) =>
        progress = parseInt(data.loaded / data.total * 100, 10)

        @setState uploadingProgress: progress
      always: =>
        @setState(uploadingProgress: 0)
        @decrementActivities()
      fail: (e, data) =>
        TastyNotifyController.errorResponse data.jqXHR
      done: (e, data) =>
        EntryStore.removeNormalizedEntry @props.normalizedEntry
        @props.doneCallback data.jqXHR.responseJSON

  _unbindImageUpload: -> @$uploadForm.fileupload 'destroy'

  _getSaveUrl: ->
    if @entryId()?
      Routes.api.update_entry_url @entryId(), @entryType()
    else
      Routes.api.create_entry_url @entryType()

  _getSaveMethod: ->
    if @entryId()? then 'PUT' else 'POST'