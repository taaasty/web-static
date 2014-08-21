###* @jsx React.DOM ###

TOOLBAR_CLOSED = 'closed'
TOOLBAR_OPENED_BY_HOVER = 'openedByHover'
TOOLBAR_OPENED_BY_CLICK = 'openedByClick'
HIDE_ON_BLUR_TIMEOUT = 100

window.UserToolbar = UserToolbar = React.createClass
  mixins: [TouchMixin]

  propTypes:
    user:                 React.PropTypes.object.isRequired
    newEntryUrl:          React.PropTypes.string
    myTlogUrl:            React.PropTypes.string.isRequired
    newAnonymousEntryUrl: React.PropTypes.string
    profileUrl:           React.PropTypes.string
    favoritesUrl:         React.PropTypes.string
    privateEntriesUrl:    React.PropTypes.string
    logoutUrl:            React.PropTypes.string

  getInitialState: ->
    user:         @props.user
    activeItem:   'newEntry'
    currentState: TOOLBAR_CLOSED

  componentDidMount: ->
    if localStorage.getItem 'displayDesignSettings'
      @showDesignSettings()
      localStorage.removeItem 'displayDesignSettings'

  render: ->
    onSelect = (type) ->
      @setState activeItem: type

      switch type
        when 'friends'  then @handleFriendsSelect()
        when 'design'   then @showDesignSettings()
        when 'settings' then @handleSettingsSelect()
        else console.log 'Неизвестный пункт тулбара пользователя'

    toolbarClasses = React.addons.classSet {
      'toolbar':        true
      'toolbar--right': true
      'toolbar--nav':   true
      'state--open':    @isOpen()
    }

    return `<nav onClick={ this.onClick }
                 onMouseEnter={ this.onMouseEnter }
                 onMouseLeave={ this.onMouseLeave }
                 className={ toolbarClasses }>
              <div className="toolbar__toggle">
                <i className="icon icon--menu"></i>
              </div>
              <div className="toolbar__popup">
                <ul className="toolbar__popup-list">
                  <ToolbarItem active={ this.state.activeItem == 'newEntry' }
                               href={ this.props.newEntryUrl }
                               icon="icon--plus"
                               title="Новая запись" />
                  <ToolbarItem href={ this.props.myTlogUrl }
                               icon="icon--diary"
                               title="Мой дневник" />
                  <ToolbarItem disabled={ true }
                               href={ this.props.profileUrl }
                               icon="icon--profile"
                               title="Профиль" />
                  <ToolbarItem href={ this.props.favoritesUrl }
                               icon="icon--star"
                               title="Избранное" />
                  <ToolbarItem href={ this.props.newAnonymousEntryUrl }
                               icon="icon--anonymous"
                               title="Новая анонимка" />
                  <ToolbarItem href={ this.props.privateEntriesUrl }
                               icon="icon--lock"
                               title="Скрытые записи" />
                  <ToolbarItem disabled={ true }
                               icon="icon--messages"
                               title="Сообщения" />
                  <ToolbarItem active={ this.state.activeItem == 'friends' }
                               onSelect={ onSelect.bind(this, 'friends') }
                               icon="icon--friends"
                               title="Друзья" />
                  <ToolbarItem active={ this.state.activeItem == 'design' }
                               onSelect={ onSelect.bind(this, 'design') }
                               icon="icon--drawing"
                               title="Дизайн дневника" />
                  <ToolbarItem active={ this.state.activeItem == 'settings' }
                               onSelect={ onSelect.bind(this, 'settings') }
                               icon="icon--cogwheel"
                               title="Настройки" />
                  <ToolbarItem href={ this.props.logoutUrl }
                               icon="icon--logout"
                               title="Выйти" />
                </ul>
              </div>
            </nav>`

  onClick: ->
    switch @state.currentState
      when TOOLBAR_CLOSED          then @setState currentState: TOOLBAR_OPENED_BY_CLICK
      when TOOLBAR_OPENED_BY_CLICK then @setState currentState: TOOLBAR_CLOSED
      when TOOLBAR_OPENED_BY_HOVER then @setState currentState: TOOLBAR_CLOSED
      else console.error? "Unknown state.currentState", @state.currentState

  onMouseEnter: ->
    clearTimeout @timeout if @timeout?

    if @state.currentState == TOOLBAR_CLOSED
      @setState currentState: TOOLBAR_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == TOOLBAR_OPENED_BY_HOVER
      @timeout = setTimeout (=>
        @setState currentState: TOOLBAR_CLOSED
      ), HIDE_ON_BLUR_TIMEOUT

  handleFriendsSelect: ->
    container = document.querySelectorAll('[popup-persons-container]')[0]
    
    unless container
      container = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get 0

    React.renderComponent PersonsPopup(user: @state.user), container

  showDesignSettings: ->
    url = window.location.origin + window.location.pathname

    if url.indexOf(@props.myTlogUrl) == -1
      TastyConfirmController.show
        message:           'Для изменения дизайна вашего дневника, необходимо перейти в профиль'
        acceptButtonText:  'Перейти в профиль'
        acceptButtonColor: 'green'
        rejectButtonText:  'Остаться на странице'
        onAccept:          @redirectToProfile
    else
      $(document).trigger 'SHOW_DESIGN_SETTINGS'

  handleSettingsSelect: ->
    if @state.user instanceof Backbone.Model
      user = @state.user
    else
      user = new Backbone.Model @state.user

    ReactApp.popup.show ToolbarSettings, {
      title:         'Настройки',
      user:          user
      onUserChanged: @onUserChanged
    }

  redirectToProfile: ->
    localStorage.setItem 'displayDesignSettings', true
    window.location = @props.myTlogUrl

  isOpen: -> @state.currentState != TOOLBAR_CLOSED

  onUserChanged: (user) -> @setState user: user

module.exports = UserToolbar