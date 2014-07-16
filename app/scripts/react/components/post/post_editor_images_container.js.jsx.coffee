###* @jsx React.DOM ###

DRAG_HOVER_CLASS = 'state--drag-hover'

window.PostEditor_ImagesContainer = React.createClass
  propTypes:
    entry:          React.PropTypes.object.isRequired

  getInitialState: ->
    isDragging: false
    loadingProgress: 0

  componentDidMount: ->
    $(window).on 'dragleave', @dragLeave

  componentWillUnmount: ->
    $(window).off 'dragleave', @dragLeave

  render: ->
    loadingProgress = `<div className="media-box__loader">
          <div className="media-box__loader-fill" style={{width: this.state.loadingProgress+'%'}} />
        </div>`

    imageActions = `<div className="media-box__actions js-tasty-editor-image-actions">
          <div className="media-box__action media-box__action--delete js-tasty-editor-image-delete" title="Удалить">h</div>
          <div className="media-box__action media-box__action--rotate js-tasty-editor-image-rotate" title="Повернуть">l</div>
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
               <PostEditor_ImageForm entry={this.props.entry} onDragOver={this.dragOver} progressUpdate={this.progressUpdate}/>
             </span>
            <span> картинку</span><br/><span>или вставьте ссылку на нее</span>
          </div>
        </div>`

    cx = React.addons.classSet "media-box": true, "state--hidden": !@state.isDragging
    `<figure className="image">
      <div className={cx} ref="dropZone">
        {loadingProgress}
        {imageActions}
        {postImageUrl}

        {infoBox}

        {imagesDisplay}
      </div>
    </figure>`

  progressUpdate: (percents) ->
    @setState loadingProgress: percents
    #@ui.imageLoader.css width: p + "%"

  dragOver:  ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @setState isDragging: true

  dragLeave: ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @_dragLeaveTimer = setTimeout @draggingOff, 1000

  draggingOff: ->
    @setState isDragging: false

  componentDidUpdate: ->
    @updateDropZoneClass @state.isDragging

  updateDropZoneClass: (active) ->
    $dropZone = $ @refs.dropZone.getDOMNode()
    $dropZone.toggleClass DRAG_HOVER_CLASS, active

window.PostEditor_ImageForm = React.createClass
  propTypes:
    entry:          React.PropTypes.object.isRequired
    onDragOver:     React.PropTypes.func.isRequired
    progressUpdate: React.PropTypes.func.isRequired

  componentDidMount: ->
    $form = $ @refs.form.getDOMNode()

    $form.fileupload
      url:               Routes.api.post_url 'image'
      dataType:          'json'
      acceptFileTypes:   /(\.|\/)(gif|jpe?g|png)$/i
      maxFileSize:       10*1000*1000
      multipart:         true
      fileInput:         @refs.input.getDOMNode()
      maxNumberOfFiles:  12
      dragover:          (e, data) => @props.onDragOver()
      progressall: (e, data) ->
        @props.progressUpdate parseInt(data.loaded / data.total * 100, 10)
          
      formData: (form) -> @props.entry

  render: ->
    # More about input accept
    # http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    #
    `<form ref='form' encType='multipart/form-data' method="POST">
      <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
    </form>`
