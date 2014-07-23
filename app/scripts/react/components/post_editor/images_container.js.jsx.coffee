###* @jsx React.DOM ###

DRAG_HOVER_CLASS = 'state--drag-hover'
DRAGOFF_TIMEOUT  = 500

ACCEPT_FILE_TYPES = /(\.|\/)(gif|jpe?g|png)$/i
MAX_FILE_SIZE    = 10*1000*1000
MAX_NUMBER_OF_FILES = 6

window.PostEditor_ImagesContainer = React.createClass
  propTypes:
    entry:       React.PropTypes.object.isRequired
    setLoading:  React.PropTypes.func.isRequired
    isLoading:   React.PropTypes.bool.isRequired
    isVisible:   React.PropTypes.bool

  getInitialState: ->
    isDragging: false
    progress:   0

  componentDidMount: ->
    $(document).on 'dragleave', @dragLeave
    $(document).on 'drop', @draggingOff

    @prepareForm()

  componentWillUnmount: ->
    $(document).off 'dragleave', @dragLeave
    $(document).off 'drop', @draggingOff

  componentDidUpdate: ->
    @updateDropZoneClass @state.isDragging

  render: ->
    postImageUrl = `<label className="media-box__form" htmlFor="media-box-image-url">
          <input id="media-box-image-url" className="media-box__form-input" type="text" />
        </label>`


    infoBox = `<div className="media-box__info">
          <div className="media-box__text">
            <span>Перетащите или </span>
            <span className="form-upload form-upload--image">
               <span className="form-upload__text">выберите</span>
               <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
             </span>
            <span> картинку</span><br/><span>или вставьте ссылку на нее</span>
          </div>
        </div>`

    mediaboxState = null
    if @props.entry.images.length>0
      unless @state.isDragging
        mediaboxState = 'loaded'
        imagesDisplay = MediaBox_Collage imageAttachments: @props.entry.images

    mediaboxState = 'drag-hover' if @state.isDragging

    cx = React.addons.classSet 'media-box': true, 'state--hidden': !@isVisible()
    return `<form ref='form' encType='multipart/form-data' method="POST">
              <MediaBox_Layout type='image' state={mediaboxState} ref="dropZone">
                <MediaBox_LoadingProgress progress={this.state.progress} />
                {postImageUrl}
                {infoBox}
                <MediaBox_Actions onDelete={this.actionDelete} />
                {imagesDisplay}
              </MediaBox_Layout>
            </form>`

  isVisible: ->
    @props.isVisible || @state.isDragging || @props.isLoading

  dragOver:  ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @setState isDragging: true

  dragLeave: ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @_dragLeaveTimer = setTimeout @draggingOff, DRAGOFF_TIMEOUT

  draggingOff: ->
    @setState isDragging: false

  updateDropZoneClass: (active) ->
    $dropZone = $ @refs.dropZone.getDOMNode()
    $dropZone.toggleClass DRAG_HOVER_CLASS, active

  prepareForm: ->
    $form = $ @refs.form.getDOMNode()

    $form.fileupload
      url:               @savingUrl()
      dataType:          'json'
      acceptFileTypes:   ACCEPT_FILE_TYPES
      maxFileSize:       MAX_FILE_SIZE
      maxNumberOfFiles:  MAX_NUMBER_OF_FILES
      multipart:         true

      fileInput:         @refs.input.getDOMNode()
      send:              => @props.setLoading true
      always:            => @props.setLoading false
      fail:     (e,data) => TastyNotifyController.errorResponse data
      dragover:          (e, data) => @dragOver()
      progressall:       (e, data) =>
        percents = parseInt(data.loaded / data.total * 100, 10)
        @setState loadingProgress: percents
          
      formData: (form)   =>
        return {} # @props.entry


  # Всегда POST запросы
  savingUrl: ->
    if @props.entry.id?
      Routes.api.update_images_url @props.entry.id
    else
      Routes.api.create_entry_url 'image'
