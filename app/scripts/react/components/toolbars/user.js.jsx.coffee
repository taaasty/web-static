###* @jsx React.DOM ###

window.UserToolbar = UserToolbar = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

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
                       onClick={ this.defaultClick }
                       icon="plus"
                       title="Новая запись"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="diary"
                       title="Мой дневник"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="profile"
                       title="Профиль"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="star"
                       title="Избранное"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="lock"
                       title="Скрытые записи"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="messages"
                       title="Сообщения"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.handleFriendsClick }
                       icon="friends"
                       title="Друзья"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="drawing"
                       title="Дизайн дневника"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.handleSettingsClick }
                       icon="cogwheel"
                       title="Настройки"></ToolbarItem>
          <ToolbarItem activeItem={ this.state.activeItem }
                       onClick={ this.defaultClick }
                       icon="logout"
                       title="Выйти"></ToolbarItem>
        </ul>
      </div>
    </nav>`

  defaultClick: (e) ->
    e.preventDefault()

  handleFriendsClick: (e) ->
    e.preventDefault()
    container = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get 0
    React.renderComponent PersonsPopup(), container

  handleSettingsClick: (e) ->
    e.preventDefault()
    ReactApp.popup.show ToolbarSettings, {
      title:  'Настройки',
      user:   @props.user
    }

module.exports = UserToolbar