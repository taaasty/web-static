ToolbarItem          = require '../_item'
UserToolbarListMixin = require './mixins/list'
{ PropTypes } = React

UserToolbarList = React.createClass
  mixins: [UserToolbarListMixin]

  propTypes:
    userSlug: PropTypes.string

  render: ->
    <ul className="toolbar__popup-list">
      <ToolbarItem
          title="Новая запись"
          href={ Routes.new_entry_url(this.props.userSlug) }
          icon="icon--plus" />
      <ToolbarItem
          title="Мой дневник"
          href={ Routes.new_anonymous_entry_url(this.props.userSlug) }
          icon="icon--diary" />
      <ToolbarItem
          title="Профиль"
          icon="icon--profile"
          onSelect={ this.showProfile } />
      <ToolbarItem
          title="Избранное"
          href={ Routes.my_tlog_url(this.props.userSlug) }
          icon="icon--star" />
      <ToolbarItem
          title="Новая анонимка"
          href={ Routes.new_anonymous_entry_url(this.props.userSlug) }
          icon="icon--anonymous" />
      <ToolbarItem
          title="Скрытые записи"
          href={ Routes.private_entries_url(this.props.userSlug) }
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
          href={ Routes.logout_path(this.props.userSlug) }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList