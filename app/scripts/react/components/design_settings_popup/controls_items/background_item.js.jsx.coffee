###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsBackgroundItem = React.createClass
  mixins: ['ReactActivitiesUser', ComponentManipulationsMixin]

  propTypes:
    slug:                React.PropTypes.string.isRequired
    backgroundUrl:       React.PropTypes.string.isRequired
    activitiesHandler:   React.PropTypes.object.isRequired
    onBackgroundChanged: React.PropTypes.func.isRequired

  getInitialState: ->
    backgroundUrl: @props.backgroundUrl
    progress:      0

  componentDidMount:    -> @_bindCoverUpload()
  componentWillUnmount: -> @_unbindCoverUpload()

  render: ->
    backgroundStyles = 'background-image': 'url(' + @state.backgroundUrl + ')'

    return `<div className="settings-design__control settings-design__control--cover">
              <DesignSettingsPopup_ControlsProgressbar progress={ this.state.progress } />
              <div className="settings-design__control-inner">
                <span className="settings-design__valign"></span>
                <span className="settings-design__text absolute--left animate--down">Фон блога</span>
                <span className="settings-design__text absolute--left animate--up">
                  Перетащите или
                  <span className="form-upload form-upload--cover">
                    <span className="form-upload__text">загрузите</span>
                    <input ref="uploadCoverInput"
                           type="file"
                           name="layout-cover"
                           id="layout-cover"
                           className="form-upload__input" />
                  </span>
                </span>
                <span className="settings-design__cover-pixel absolute--right animate--right"
                      style={ backgroundStyles }></span>
              </div>
            </div>`

  _bindCoverUpload: ->
    @$uploadCoverInput = $( @refs.uploadCoverInput.getDOMNode() )

    @$uploadCoverInput.fileupload
      url: Routes.api.design_settings_cover_url @props.slug
      paramName: 'file'
      autoUpload: true
      replaceFileInput: false
      add: (e, data) =>
        @_readFile data.files[0]
        data.process().done -> data.submit()
      start: => @incrementActivities()
      progress: (e, data) =>
        progress = parseInt(data.loaded / data.total * 100, 10)

        @safeUpdateState { progress }
      done: (e, data) =>
        @props.onBackgroundChanged data.jqXHR.responseJSON

        TastyNotifyController.notifySuccess 'Настройки сохранены', 2000
      fail: (e, data) ->
        TastyNotifyController.errorResponse data.response().jqXHR
      always: =>
        @decrementActivities()
        @safeUpdateState(progress: 0)

  _readFile: (file) ->
    fileReader = new FileReader()

    fileReader.onload = (e) =>
      url = e.target.result
      @_setBodyBackgroundImage url

    fileReader.readAsDataURL file

  _unbindCoverUpload: ->
    @$uploadCoverInput.fileupload 'destroy'

  _setBodyBackgroundImage: (url) ->
    $coverBackground = $('.page-cover')

    $coverBackground.css 'background-image', 'url(' + url + ')'
    @safeUpdateState backgroundUrl: url