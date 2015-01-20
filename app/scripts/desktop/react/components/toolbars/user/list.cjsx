ToolbarItem          = require '../_item'
UserToolbarListMixin = require './mixins/list'
{ PropTypes } = React

UserToolbarList = React.createClass
  mixins: [UserToolbarListMixin]

  propTypes:
    myTlogUrl:            PropTypes.string.isRequired
    newEntryUrl:          PropTypes.string
    newAnonymousEntryUrl: PropTypes.string
    favoritesUrl:         PropTypes.string
    privateEntriesUrl:    PropTypes.string
    logoutUrl:            PropTypes.string

  render: ->
    <ul className="toolbar__popup-list">
      <ToolbarItem
          title="Новая запись"
          href={ this.props.newEntryUrl }
          icon="icon--plus" />
      <ToolbarItem
          title="Мой дневник"
          href={ this.props.myTlogUrl }
          icon="icon--diary" />
      <ToolbarItem
          title="Профиль"
          icon="icon--profile"
          onSelect={ this.showProfile } />
      <ToolbarItem
          title="Избранное"
          href={ this.props.favoritesUrl }
          icon="icon--star" />
      <ToolbarItem
          title="Новая анонимка"
          href={ this.props.newAnonymousEntryUrl }
          icon="icon--anonymous" />
      <ToolbarItem
          title="Скрытые записи"
          href={ this.props.privateEntriesUrl }
          icon="icon--lock" />
      <ToolbarItem
          title="Сообщения"
          icon="icon--messages"
          onSelect={ this.showMessages } />
      <ToolbarItem
          title="Друзья"
          icon="icon--friends"
          onSelect={ this.showFriends } />
      <ToolbarItem
          title="Дизайн дневника"
          icon="icon--drawing"
          onSelect={ this.showDesignSettings } />
      <ToolbarItem
          title="Настройки"
          icon="icon--cogwheel"
          onSelect={ this.showSettings } />
      <ToolbarItem
          title="Выйти"
          href={ this.props.logoutUrl }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList

# <ToolbarItem
#   title="Мобильная версия"
#   href={ this.props.mobileUrl }
#   icon="icon--mobile" />