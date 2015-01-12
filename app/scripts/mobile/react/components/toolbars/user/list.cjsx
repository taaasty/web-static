ToolbarItem          = require '../_item'
UserToolbarListMixin = require './mixins/list'
{ PropTypes } = React

UserToolbarList = React.createClass
  displayName: 'UserToolbarList'
  mixins: [UserToolbarListMixin]

  propTypes:
    user: PropTypes.object

  render: ->
    <ul className="toolbar__popup-list">
      <ToolbarItem
          title="Новая запись"
          href={ Routes.new_entry_url(@props.user.slug) }
          icon="icon--plus" />
      <ToolbarItem
          title="Мой дневник"
          href={ Routes.my_tlog_url(@props.user.slug) }
          icon="icon--diary" />
      <ToolbarItem
          title="Профиль"
          icon="icon--profile"
          href={ Routes.userProfile(@props.user.slug) } />
      <ToolbarItem
          title="Избранное"
          href={ Routes.favorites_url(@props.user.slug) }
          icon="icon--star" />
      <ToolbarItem
          title="Новая анонимка"
          href={ Routes.new_anonymous_entry_url(@props.user.slug) }
          icon="icon--anonymous" />
      <ToolbarItem
          title="Скрытые записи"
          href={ Routes.private_entries_url(@props.user.slug) }
          icon="icon--lock" />
      <ToolbarItem
          title="Сообщения"
          icon="icon--messages"
          onSelect={ @showMessages } />
      <ToolbarItem
          title="Друзья"
          icon="icon--friends"
          onSelect={ @showFriends } />
      <ToolbarItem
          title="Дизайн дневника"
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) } />
      <ToolbarItem
          title="Настройки"
          icon="icon--cogwheel"
          href={ Routes.userSettings(@props.user.slug) } />
      <ToolbarItem
          title="Выйти"
          href={ Routes.logout_path(@props.user.slug) }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList