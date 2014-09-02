###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsBackgroundItem = React.createClass
  mixins: ['ReactActivitiesUser', ComponentManipulationsMixin]

  propTypes:
    slug:              React.PropTypes.string.isRequired
    backgroundUrl:     React.PropTypes.string.isRequired
    activitiesHandler: React.PropTypes.object.isRequired

  getInitialState: ->
    backgroundUrl: @props.backgroundUrl

  componentDidMount: -> @_initCoverUpload()

  render: ->
    backgroundStyles = 'background-image': 'url(' + @state.backgroundUrl + ')'

    return `<div className="settings-design__control settings-design__control--cover">
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

  _initCoverUpload: ->
    $uploadCoverInput = $( @refs.uploadCoverInput.getDOMNode() )

    $uploadCoverInput.fileupload
      url: Routes.api.design_settings_cover_url @props.slug
      paramName: 'file'
      autoUpload: true
      replaceFileInput: false
      start: =>
        @incrementActivities()
      done: (e, data) =>
        @_setBodyBackgroundImage data.jqXHR.responseJSON.background_url

        TastyNotifyController.notifySuccess 'Настройки сохранены', 2000
      fail: (e, data) ->
        TastyNotifyController.errorResponse data.response().jqXHR
      always: =>
        @decrementActivities()

  _setBodyBackgroundImage: (url) ->
    $coverBackground = $('.page-cover')

    $coverBackground.css 'background-image', 'url(' + url + ')'
    @safeUpdateState backgroundUrl: url