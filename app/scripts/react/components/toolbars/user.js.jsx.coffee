###* @jsx React.DOM ###

window.UserToolbar = UserToolbar = React.createClass

  propTypes:
    user:              React.PropTypes.object.isRequired
    newEntryUrl:       React.PropTypes.string
    myTlogUrl:         React.PropTypes.string
    profileUrl:        React.PropTypes.string
    favoritesUrl:      React.PropTypes.string
    privateEntriesUrl: React.PropTypes.string
    logoutUrl:         React.PropTypes.string

  getInitialState: ->
    activeItem: 'plus'

  render: ->
   `<nav className="toolbar toolbar--right toolbar--nav">
      <div className="toolbar__toggle">
        <i className="icon icon--menu"></i>
      </div>
      <div className="toolbar__popup">
        <ul className="toolbar__popup-list">
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.newEntryUrl }
                       onClick={ this.updateActiveItem }
                       icon="plus"
                       title="Новая запись"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.myTlogUrl }
                       onClick={ this.updateActiveItem }
                       icon="diary"
                       title="Мой дневник"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.profileUrl }
                       onClick={ this.updateActiveItem }
                       icon="profile"
                       title="Профиль"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.favoritesUrl }
                       onClick={ this.updateActiveItem }
                       icon="star"
                       title="Избранное"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.privateEntriesUrl }
                       onClick={ this.updateActiveItem }
                       icon="lock"
                       title="Скрытые записи"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.updateActiveItem }
                       icon="messages"
                       title="Сообщения"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.handleFriendsClick }
                       icon="friends"
                       title="Друзья"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.updateActiveItem }
                       icon="drawing"
                       title="Дизайн дневника"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.handleSettingsClick }
                       icon="cogwheel"
                       title="Настройки"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       href={ this.props.logoutUrl }
                       onClick={ this.updateActiveItem }
                       icon="logout"
                       title="Выйти"></ToolbarItem>
        </ul>
      </div>
    </nav>`

  updateActiveItem: (item) -> @setState activeItem: item

  handleFriendsClick: ->
    @updateActiveItem.apply @, arguments
    container = document.querySelectorAll('[popup-persons-container]')[0]
    
    unless container
      container = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get 0
    React.renderComponent PersonsPopup(), container

  handleSettingsClick: ->
    @updateActiveItem.apply @, arguments

    ReactApp.popup.show ToolbarSettings, {
      title:  'Настройки',
      user:   @props.user
    }

module.exports = UserToolbar