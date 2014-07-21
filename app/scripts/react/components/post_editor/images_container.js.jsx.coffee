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
    console.log 'isVisible', @isVisible()

    imageActions = `<div className="media-box__actions js-tasty-editor-image-actions">
          <div className="media-box__action media-box__action--delete" title="Удалить"><span className='icon icon--cross' /></div>
          <div className="media-box__action media-box__action--rotate" title="Повернуть"><span className='icon icon--rotate' /></div>
        </div>`

    postImageUrl = `<label className="media-box__form js-tasty-editor-image-form" htmlFor="media-box-image-url">
          <input id="media-box-image-url" className="media-box__form-input js-tasty-editor-image-form-url" type="text" />
        </label>`

    imagesDisplay = `<div className="media-box__display js-tasty-editor-image-display" />`

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


    cx = React.addons.classSet 'media-box': true, 'state--hidden': !@isVisible()
    return `<form ref='form' encType='multipart/form-data' method="POST">
        <figure className="image">
          <div className={cx} ref="dropZone">
            <PostEditor_MediaLoadingProgress progress={this.state.progress} />
            {postImageUrl}

            {infoBox}

            {imageActions}
            {imagesDisplay}
          </div>
        </figure></form>`

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
      url:               Routes.api.post_url 'image'
      dataType:          'json'
      acceptFileTypes:   ACCEPT_FILE_TYPES
      maxFileSize:       MAX_FILE_SIZE
      maxNumberOfFiles:  MAX_NUMBER_OF_FILES
      multipart:         true
      fileInput:         @refs.input.getDOMNode()
      send:              => @setLoading true
      always:            => @setLoading false
      fail:     (e,data) => TastyNotifyController.errorResponse data
      dragover:          (e, data) => @dragOver()
      progressall:       (e, data) =>
        percents = parseInt(data.loaded / data.total * 100, 10)
        @setState loadingProgress: percents
          
      formData: (form)   => @props.entry


window.PostEditor_MediaLoadingProgress = React.createClass
  propTypes:
    progress: React.PropTypes.number.isRequired

  render: ->
    @props.progress = Math.min @props.progress, 100
    @props.progress = Math.max @props.progress, 0
    `<div className="media-box__loader">
      <div className="media-box__loader-fill" style={{width: this.props.progress+'%'}} />
     </div>`
