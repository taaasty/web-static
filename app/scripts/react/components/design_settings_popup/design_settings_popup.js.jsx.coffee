###* @jsx React.DOM ###

DESIGN_SETTINGS_POPUP_TITLE = 'Управление дизайном'

window.DesignSettingsPopup = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin, ReactShakeMixin]

  propTypes:
    user:          React.PropTypes.object.isRequired
    onUserChanged: React.PropTypes.func.isRequired

  getInitialState: ->
    isDragged: false

  componentDidMount: ->
    @props.user.on 'change', @updateStateUser
    @$designSettings = $( @refs.designSettings.getDOMNode() )

  componentWillUnmount: ->
    @props.user.off 'change', @updateStateUser

  render: ->
    designSettingsClasses = React.addons.classSet {
      'settings-design': true
      'state--drag-hover': @state.isDragged
    }

    `<Popup hasActivities={ this.hasActivities() }
            title={ DESIGN_SETTINGS_POPUP_TITLE }
            isDraggable={ true }
            position={{ top: 30, left: 30 }}
            className="popup--settings-design"
            onClose={ this.unmount }>

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
                                       saveCallback={ this.save } />
      </div>

    </Popup>`

  onDragEnter: ->
    @setState isDragged: true unless @state.isDragged

  onDragLeave: (e) ->
    if e.target.className is e.currentTarget.className
      @setState isDragged: false

  onDrop: ->
    @setState isDragged: false

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
      success: (design) =>
        newUser = @props.user
        newUser.design = design

        @props.user.set newUser

        TastyNotifyController.notifySuccess 'Настройки сохранены', 2000
      error: (data) =>
        @shake()
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()