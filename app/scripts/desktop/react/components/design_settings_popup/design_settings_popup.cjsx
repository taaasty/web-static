cx                       = require 'react/lib/cx'
CurrentUserServerActions = require '../../actions/server/current_user'

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
                  title={ i18n.t('design_settings_header') }
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
                   { i18n.t('design_settings_drop_hint') }
                 </div>
               </div>

               <DesignSettingsPopup_Controls
                   design={ this.state.user.design }
                   userId={ this.state.user.id }
                   activitiesHandler={ this.activitiesHandler }
                   saveCallback={ this.save }
                   onBackgroundChanged={ this._updateUserDesign } />
             </div>
           </Popup>

  save: (key, value) ->
    data      = {}
    data[key] = value
    data._method = 'PUT'

    console.log 'save design', key, value
    @incrementActivities()

    @createRequest
      url: ApiRoutes.design_settings_url @state.user.id
      data: data
      method: 'POST'
      success: (newDesign) =>
        @_updateUserDesign newDesign

        TastyNotifyController.notifySuccess i18n.t('settings_saved'), 2000
      error: (data) =>
        @shake()
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

  close: ->
    if @hasActivities()
      TastyAlertController.show
        message:    i18n.t 'settings_still_saving'
        buttonText: i18n.t 'i_ll_be_waiting'
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
      i18n.t 'settings_still_saving_confirm'

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

  _onStoreChange: ->
    @setState @getStateFromStore()