###* @jsx React.DOM ###

DESIGN_SETTINGS_POPUP_TITLE = 'Управление дизайном'

window.DesignSettingsPopup = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin, ReactShakeMixin, ReactUnmountMixin]

  propTypes:
    user:          React.PropTypes.object.isRequired
    onUserChanged: React.PropTypes.func.isRequired

  getInitialState: ->
    isDragged: false

  componentDidMount: ->
    @$designSettings = $( @refs.designSettings.getDOMNode() )

    @props.user.on 'change', @updateStateUser
    $(window).on 'beforeunload', @onPageClose

  componentWillUnmount: ->
    @props.user.off 'change', @updateStateUser
    $(window).off 'beforeunload', @onPageClose

  render: ->
    designSettingsClasses = React.addons.classSet {
      'settings-design': true
      'state--drag-hover': @state.isDragged
    }

    return `<Popup hasActivities={ this.hasActivities() }
                   title={ DESIGN_SETTINGS_POPUP_TITLE }
                   isDraggable={ true }
                   position={{ top: 30, left: 30 }}
                   className="popup--settings-design"
                   onClose={ this.close }>

              <div ref="designSettings"
                   className={ designSettingsClasses }
                   onDragEnter={ this.onDragEnter }>

                <div className="settings-design__drop"
                     onDragLeave={ this.onDragLeave }
                     onDrop={ this.onDrop }>
                  <div className="settings-design__drop-text">
                    Отпустите картинку и она начнет загружаться
                  </div>
                </div>

                <DesignSettingsPopup_Controls design={ this.props.user.get('design') }
                                              slug={ this.props.user.get('slug') }
                                              activitiesHandler={ this.activitiesHandler }
                                              saveCallback={ this.save }
                                              onBackgroundChanged={ this._updateUserDesign } />
              </div>

            </Popup>`

  updateStateUser: (user) -> @props.onUserChanged user

  save: (key, value) ->
    data      = {}
    data[key] = value

    console.log 'save design', key, value
    @incrementActivities()

    @createRequest
      url: Routes.api.design_settings_url @props.user.get('slug')
      data: data
      method: 'PUT'
      success: (newDesign) =>
        @_updateUserDesign newDesign

        TastyNotifyController.notifySuccess 'Настройки сохранены', 2000
      error: (data) =>
        @shake()
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

  close: ->
    if @hasActivities()
      TastyAlertController.show
        message:    'Некоторые настройки ещё не успели сохраниться.'
        buttonText: 'Я подожду'
    else
      @unmount()

  _updateUserDesign: (design) ->
    newUser = @props.user
    newUser.design = design

    @props.user.set newUser

  onDragEnter: ->
    @setState isDragged: true unless @state.isDragged

  onDragLeave: (e) ->
    if e.target.className is e.currentTarget.className
      @setState isDragged: false

  onDrop: ->
    @setState isDragged: false

  onPageClose: (e) ->
    if @hasActivities()
      'Некоторые настройки ещё не успели сохраниться. Вы уверены, что хотите выйти?'
