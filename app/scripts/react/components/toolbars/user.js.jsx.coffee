###* @jsx React.DOM ###

TOOLBAR_CLOSED = 'closed'
TOOLBAR_OPENED_BY_HOVER = 'openedByHover'
TOOLBAR_OPENED_BY_CLICK = 'openedByClick'
HIDE_ON_BLUR_TIMEOUT = 500

window.UserToolbar = UserToolbar = React.createClass

  propTypes:
    user:              React.PropTypes.object.isRequired
    newEntryUrl:       React.PropTypes.string
    myTlogUrl:         React.PropTypes.string
    profileUrl:        React.PropTypes.string
    favoritesUrl:      React.PropTypes.string
    privateEntriesUrl: React.PropTypes.string
    logoutUrl:         React.PropTypes.string

  getDefaultProps: ->
    # TODO Всегда получать урлы из свойств
    newEntryUrl:       '@sergeylaptev/new'
    myTlogUrl:         '@sergeylaptev'
    profileUrl:        '@sergeylaptev'
    favoritesUrl:      '@sergeylaptev/favorites'
    privateEntriesUrl: '@sergeylaptev/privates'
    logoutUrl:         'logout'

  getInitialState: ->
    activeItem:  'newEntry'
    currentState: TOOLBAR_CLOSED

  render: ->
    onSelect = (type) ->
      @setState activeItem: type

      switch type
        when 'friends'  then @handleFriendsSelect()
        when 'design'   then @handleDesignSelect()
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
                               icon="plus"
                               title="Новая запись" />
                  <ToolbarItem href={ this.props.myTlogUrl }
                               icon="diary"
                               title="Мой дневник" />
                  <ToolbarItem href={ this.props.profileUrl }
                               icon="profile"
                               title="Профиль" />
                  <ToolbarItem href={ this.props.favoritesUrl }
                               icon="star"
                               title="Избранное" />
                  <ToolbarItem href={ this.props.privateEntriesUrl }
                               icon="lock"
                               title="Скрытые записи" />
                  <ToolbarItem disabled={ true }
                               icon="messages"
                               title="Сообщения" />
                  <ToolbarItem active={ this.state.activeItem == 'friends' }
                               onSelect={ onSelect.bind(this, 'friends') }
                               icon="friends"
                               title="Друзья" />
                  <ToolbarItem active={ this.state.activeItem == 'design' }
                               onSelect={ onSelect.bind(this, 'design') }
                               icon="drawing"
                               title="Дизайн дневника" />
                  <ToolbarItem active={ this.state.activeItem == 'settings' }
                               onSelect={ onSelect.bind(this, 'settings') }
                               icon="cogwheel"
                               title="Настройки" />
                  <ToolbarItem href={ this.props.logoutUrl }
                               icon="logout"
                               title="Выйти" />
                </ul>
              </div>
            </nav>`

  onClick: ->
    switch @state.currentState
      when TOOLBAR_CLOSED          then @setState currentState: TOOLBAR_OPENED_BY_CLICK
      when TOOLBAR_OPENED_BY_CLICK then @setState currentState: TOOLBAR_CLOSED
      when TOOLBAR_OPENED_BY_HOVER then @setState currentState: TOOLBAR_OPENED_BY_CLICK
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

    React.renderComponent PersonsPopup(), container

  handleDesignSelect: ->
    # Hello Angular
    $(document).trigger 'SHOW_DESIGN_SETTINGS'

  handleSettingsSelect: ->
    user = new Backbone.Model @props.user
    ReactApp.popup.show ToolbarSettings, {
      title: 'Настройки',
      user:  user
    }

  isOpen: -> @state.currentState != TOOLBAR_CLOSED

module.exports = UserToolbar