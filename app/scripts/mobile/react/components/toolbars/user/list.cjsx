ToolbarItem          = require '../_item'
UserToolbarListMixin = require './mixins/list'
{ PropTypes } = React

UserToolbarList = React.createClass
  displayName: 'UserToolbarList'
  mixins: [UserToolbarListMixin]

  propTypes:
    user:                     PropTypes.object
    unreadConversationsCount: PropTypes.number.isRequired
    unreadNotificationsCount: PropTypes.number.isRequired

  render: ->
    <ul className="toolbar__popup-list">
      <ToolbarItem
          title={ i18n.t('user_toolbar.new_entry_item') }
          href={ Routes.new_entry_url(@props.user.slug) }
          icon="icon--plus" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.my_diary_item') }
          href={ Routes.my_tlog_url(@props.user.slug) }
          icon="icon--diary" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.profile_item') }
          icon="icon--profile"
          href={ Routes.userProfile(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('user_toolbar.favorites_item') }
          href={ Routes.favorites_url(@props.user.slug) }
          icon="icon--star" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.new_anonymous_item') }
          href={ Routes.new_anonymous_entry_url(@props.user.slug) }
          icon="icon--anonymous" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.privates_item') }
          href={ Routes.private_entries_url(@props.user.slug) }
          icon="icon--lock" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.messages_item') }
          href={ Routes.messagesUrl(@props.user.slug) }
          badgeCount={ @props.unreadConversationsCount }
          badgeClassName="messages-badge"
          icon="icon--messages" />
      <ToolbarItem
          title="Уведомления"
          href={ Routes.notificationsUrl(@props.user.slug) }
          badgeCount={ @props.unreadNotificationsCount }
          badgeClassName="notifications-badge"
          icon="icon--bell" />
      <ToolbarItem
          title={ i18n.t('user_toolbar.friends_item') }
          icon="icon--friends"
          onSelect={ @showFriends } />
      <ToolbarItem
          title={ i18n.t('user_toolbar.design_item') }
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('user_toolbar.settings_item') }
          icon="icon--cogwheel"
          href={ Routes.userSettings(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('user_toolbar.logout_item') }
          href={ Routes.logout_path(@props.user.slug) }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList