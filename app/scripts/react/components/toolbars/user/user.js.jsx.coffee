###* @jsx React.DOM ###

PureRenderMixin = React.addons.PureRenderMixin
MOUSE_LEAVE_TIMEOUT = 300
TOOLBAR_CLOSED          = 'closed'
TOOLBAR_OPENED_BY_HOVER = 'openedByHover'
TOOLBAR_OPENED_BY_CLICK = 'openedByClick'

window.UserToolbar = React.createClass
  mixins: [TouchMixin, ComponentManipulationsMixin, PureRenderMixin, ScrollerMixin]

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
    user:         new Backbone.Model @props.user
    currentState: TOOLBAR_CLOSED

  componentDidMount: ->
    if localStorage.getItem 'displayDesignSettings'
      @showDesignSettings()
      localStorage.removeItem 'displayDesignSettings'

    @state.user.on 'change', @updateStateUser

  componentWillUpdate: (nextProps, nextState) ->
    if @state.currentState isnt nextState.currentState
      switch nextState.currentState
        when TOOLBAR_OPENED_BY_CLICK then TastyEvents.emit TastyEvents.keys.user_toolbar_opened()
        when TOOLBAR_OPENED_BY_HOVER then TastyEvents.emit TastyEvents.keys.user_toolbar_opened()
        when TOOLBAR_CLOSED          then TastyEvents.emit TastyEvents.keys.user_toolbar_closed()

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

    @state.user.off 'change', @updateStateUser

  render: ->
    toolbarClasses = React.addons.classSet {
      'toolbar':        true
      'toolbar--right': true
      'toolbar--nav':   true
      'state--open':    @isOpen()
    }

    #<ToolbarItem disabled={ true }
                 #href={ this.props.profileUrl }
                 #icon="icon--profile"
                 #title="Профиль" />
    return `<nav onClick={ this.onClick }
                 onMouseEnter={ this.onMouseEnter }
                 onMouseLeave={ this.onMouseLeave }
                 className={ toolbarClasses }>
              <div className="toolbar__toggle">
                <i className="icon icon--menu" />
              </div>
              <div className="toolbar__popup">
                <div className="scroller scroller--dark scroller--toolbar" ref="scroller">
                  <div className="scroller__pane js-scroller-pane">
                    <ul className="toolbar__popup-list">
                      <ToolbarItem href={ this.props.newEntryUrl }
                                   icon="icon--plus"
                                   title="Новая запись" />
                      <ToolbarItem href={ this.props.myTlogUrl }
                                   icon="icon--diary"
                                   title="Мой дневник" />
                      <ToolbarItem href={ this.props.favoritesUrl }
                                   icon="icon--star"
                                   title="Избранное" />
                      <ToolbarItem href={ this.props.newAnonymousEntryUrl }
                                   icon="icon--anonymous"
                                   title="Новая анонимка" />
                      <ToolbarItem href={ this.props.privateEntriesUrl }
                                   icon="icon--lock"
                                   title="Скрытые записи" />
                      <ToolbarItem onSelect={ this.handleMessagesSelect }
                                   icon="icon--messages"
                                   title="Сообщения" />
                      <ToolbarItem onSelect={ this.handleFriendsSelect }
                                   icon="icon--friends"
                                   title="Друзья" />
                      <ToolbarItem onSelect={ this.showDesignSettings }
                                   icon="icon--drawing"
                                   title="Дизайн дневника" />
                      <ToolbarItem onSelect={ this.handleSettingsSelect }
                                   icon="icon--cogwheel"
                                   title="Настройки" />
                      <ToolbarItem href={ this.props.logoutUrl }
                                   icon="icon--logout"
                                   title="Выйти" />
                    </ul>
                  </div>
                  <div className="scroller__track js-scroller-track">
                      <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
            </nav>`

  handleFriendsSelect: ->
    container = document.querySelectorAll('[popup-persons-container]')[0]

    unless container
      container = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get 0

    React.renderComponent PersonsPopup(user: @state.user), container

  showDesignSettings: ->
    url = window.location.href
    container = document.querySelectorAll('[popup-design-settings-container]')[0]

    unless container
      container = $('<\div>', {'popup-design-settings-container': ''}).appendTo('body').get 0

    if url.indexOf( @props.myTlogUrl ) == -1
      TastyConfirmController.show
        message:           'Для изменения дизайна вашего дневника, необходимо перейти в тлог'
        acceptButtonText:  'Перейти в тлог'
        acceptButtonColor: 'green'
        onAccept:          @redirectToProfile
    else
      React.renderComponent DesignSettingsPopup(user: @state.user), container

  handleSettingsSelect: ->
    ReactApp.popup.show ToolbarSettings, {
      title: 'Настройки'
      user:  @state.user
    }

  handleMessagesSelect: ->
    PopupActions.openMessagesPopup()

  redirectToProfile: ->
    localStorage.setItem 'displayDesignSettings', true
    window.location = @props.myTlogUrl

  isOpen: -> @state.currentState != TOOLBAR_CLOSED

  updateStateUser: (user) -> @setState { user }

  onClick: ->
    switch @state.currentState
      when TOOLBAR_CLOSED          then @setState(currentState: TOOLBAR_OPENED_BY_CLICK)
      when TOOLBAR_OPENED_BY_CLICK then @setState(currentState: TOOLBAR_CLOSED)
      when TOOLBAR_OPENED_BY_HOVER then @setState(currentState: TOOLBAR_CLOSED)
      else console.error? 'Unknown state.currentState', @state.currentState

  onMouseEnter: ->
    clearTimeout @timeout if @timeout?

    if @state.currentState == TOOLBAR_CLOSED
      @setState(currentState: TOOLBAR_OPENED_BY_HOVER)

  onMouseLeave: ->
    if @state.currentState == TOOLBAR_OPENED_BY_HOVER
      @timeout = setTimeout (=>
        @safeUpdateState(currentState: TOOLBAR_CLOSED)
      ), MOUSE_LEAVE_TIMEOUT
