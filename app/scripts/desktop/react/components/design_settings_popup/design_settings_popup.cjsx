cx                       = require 'react/lib/cx'
CurrentUserServerActions = require '../../actions/server/current_user'

DESIGN_SETTINGS_POPUP_TITLE = 'Управление дизайном'

window.DesignSettingsPopup = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin, ReactShakeMixin, ReactUnmountMixin]

  getInitialState: ->
    _.extend @getStateFromStore(), isDragged: false

  componentDidMount: ->
    @$designSettings = $( @refs.designSettings.getDOMNode() )

    CurrentUserStore.addChangeListener @_onStoreChange
    $(window).on 'beforeunload', @onPageClose

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @_onStoreChange
    $(window).off 'beforeunload', @onPageClose

  render: ->
    designSettingsClasses = cx
      'settings-design': true
      'state--drag-hover': @state.isDragged

    return <Popup hasActivities={ this.hasActivities() }
                  title={ DESIGN_SETTINGS_POPUP_TITLE }
                  isDraggable={ true }
                  colorScheme="dark"
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

               <DesignSettingsPopup_Controls design={ this.state.user.design }
                                             userId={ this.state.user.id }
                                             activitiesHandler={ this.activitiesHandler }
                                             saveCallback={ this.save }
                                             onBackgroundChanged={ this._updateUserDesign } />
             </div>
           </Popup>

  save: (key, value) ->
    data      = {}
    data[key] = value

    console.log 'save design', key, value
    @incrementActivities()

    @createRequest
      url: ApiRoutes.design_settings_url @state.user.id
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
    newUser = @state.user
    newUser.design = design

    CurrentUserServerActions.updateUser newUser

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

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

  _onStoreChange: ->
    @setState @getStateFromStore()