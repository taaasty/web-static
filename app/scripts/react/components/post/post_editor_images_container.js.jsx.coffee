###* @jsx React.DOM ###

DRAG_HOVER_CLASS = 'state--drag-hover'
DRAGOFF_TIMEOUT  = 500

window.PostEditor_ImagesContainer = React.createClass
  propTypes:
    entry:          React.PropTypes.object.isRequired

  getInitialState: ->
    isDragging: false
    isLoading:  false
    loadingProgress: 0

  componentDidMount: ->
    $(document).on 'dragleave', @dragLeave
    $(document).on 'drop', @draggingOff

  componentWillUnmount: ->
    $(document).off 'dragleave', @dragLeave
    $(document).off 'drop', @draggingOff

  isVisible: ->
    @state.isDragging || @state.isLoading

  render: ->
    $('.post-actions').toggleClass 'state--loading', @state.isDragging || @state.isLoading
    loadingProgress = `<div className="media-box__loader">
          <div className="media-box__loader-fill" style={{width: this.state.loadingProgress+'%'}} />
        </div>`

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
               <PostEditor_ImageForm entry={this.props.entry} onDragOver={this.dragOver} onLoading={this.updateLoading} progressUpdate={this.progressUpdate}/>
             </span>
            <span> картинку</span><br/><span>или вставьте ссылку на нее</span>
          </div>
        </div>`

    console.log 'isVisible', @isVisible()
    cx = React.addons.classSet "media-box": true, "state--hidden": !@isVisible(), 'state--insert': @isVisible()
    `<figure className="image">
      <div className={cx} ref="dropZone">
        {loadingProgress}
        {imageActions}
        {postImageUrl}

        {infoBox}

        {imagesDisplay}
      </div>
    </figure>`

  updateLoading: (isLoading) ->
    @setState isLoading: isLoading

  progressUpdate: (percents) ->
    @setState loadingProgress: percents
    #@ui.imageLoader.css width: p + "%"

  dragOver:  ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @setState isDragging: true

  dragLeave: ->
    clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
    @_dragLeaveTimer = setTimeout @draggingOff, DRAGOFF_TIMEOUT

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
    onLoading:      React.PropTypes.func.isRequired

  getInitialState: ->
    isLoading: false

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
      send:              =>
        @props.onLoading true
        @setState isLoading: true
      fail:     (e,data) =>
        TastyNotifyController.errorResponse data
      always:            =>
        @props.onLoading false
        @setState isLoading: false
      dragover:          (e, data) => @props.onDragOver()
      progressall:       (e, data) =>
        @props.progressUpdate parseInt(data.loaded / data.total * 100, 10)
          
      formData: (form)   => @props.entry

  render: ->
    $('.post-actions').toggleClass 'state--loading', @state.isLoading
    # More about input accept
    # http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    #
    `<form ref='form' encType='multipart/form-data' method="POST">
      <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
    </form>`
