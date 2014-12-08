###* @jsx React.DOM ###

UserToolbarListMixin = require './mixins/list'

UserToolbarList = React.createClass
  mixins: [UserToolbarListMixin]

  propTypes:
    myTlogUrl:            React.PropTypes.string.isRequired
    newEntryUrl:          React.PropTypes.string
    newAnonymousEntryUrl: React.PropTypes.string
    favoritesUrl:         React.PropTypes.string
    privateEntriesUrl:    React.PropTypes.string
    logoutUrl:            React.PropTypes.string

  render: ->
   `<ul className="toolbar__popup-list">
      <ToolbarItem href={ this.props.newEntryUrl }
                   icon="icon--plus"
                   title="Новая запись" />
      <ToolbarItem href={ this.props.myTlogUrl }
                   icon="icon--diary"
                   title="Мой дневник" />
      <ToolbarItem icon="icon--profile"
                   title="Профиль"
                   onSelect={ this.showProfile } />
      <ToolbarItem href={ this.props.favoritesUrl }
                   icon="icon--star"
                   title="Избранное" />
      <ToolbarItem href={ this.props.newAnonymousEntryUrl }
                   icon="icon--anonymous"
                   title="Новая анонимка" />
      <ToolbarItem href={ this.props.privateEntriesUrl }
                   icon="icon--lock"
                   title="Скрытые записи" />
      <ToolbarItem icon="icon--messages"
                   title="Сообщения"
                   onSelect={ this.showMessages } />
      <ToolbarItem icon="icon--friends"
                   title="Друзья"
                   onSelect={ this.showFriends } />
      <ToolbarItem icon="icon--drawing"
                   title="Дизайн дневника"
                   onSelect={ this.showDesignSettings } />
      <ToolbarItem icon="icon--cogwheel"
                   title="Настройки"
                   onSelect={ this.showSettings } />
      <ToolbarItem href={ this.props.logoutUrl }
                   icon="icon--logout"
                   title="Выйти" />
    </ul>`

module.exports = UserToolbarList