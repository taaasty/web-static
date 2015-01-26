ToolbarItem          = require '../_item'
UserToolbarListMixin = require './mixins/list'
{ PropTypes } = React

NEW_ENTRY_ITEM     = -> t 'toolbar_new_entry_item'
MY_DIARY_ITEM      = -> t 'toolbar_my_diary_item'
PROFILE_ITEM       = -> t 'toolbar_profile_item'
FAVORITES_ITEM     = -> t 'toolbar_favorites_item'
NEW_ANONYMOUS_ITEM = -> t 'toolbar_new_anonymous_item'
PRIVATES_ITEM      = -> t 'toolbar_privates_item'
MESSAGES_ITEM      = -> t 'toolbar_messages_item'
FRIENDS_ITEM       = -> t 'toolbar_friends_item'
DESIGN_ITEM        = -> t 'toolbar_design_item'
SETTINGS_ITEM      = -> t 'toolbar_settings_item'
LOGOUT_ITEM        = -> t 'toolbar_logout_item'

UserToolbarList = React.createClass
  displayName: 'UserToolbarList'
  mixins: [UserToolbarListMixin]

  propTypes:
    user: PropTypes.object

  render: ->
    <ul className="toolbar__popup-list">
      <ToolbarItem
          title={ NEW_ENTRY_ITEM() }
          href={ Routes.new_entry_url(@props.user.slug) }
          icon="icon--plus" />
      <ToolbarItem
          title={ MY_DIARY_ITEM() }
          href={ Routes.my_tlog_url(@props.user.slug) }
          icon="icon--diary" />
      <ToolbarItem
          title={ PROFILE_ITEM() }
          icon="icon--profile"
          href={ Routes.userProfile(@props.user.slug) } />
      <ToolbarItem
          title={ FAVORITES_ITEM() }
          href={ Routes.favorites_url(@props.user.slug) }
          icon="icon--star" />
      <ToolbarItem
          title={ NEW_ANONYMOUS_ITEM() }
          href={ Routes.new_anonymous_entry_url(@props.user.slug) }
          icon="icon--anonymous" />
      <ToolbarItem
          title={ PRIVATES_ITEM() }
          href={ Routes.private_entries_url(@props.user.slug) }
          icon="icon--lock" />
      <ToolbarItem
          title={ MESSAGES_ITEM() }
          icon="icon--messages"
          onSelect={ @showMessages } />
      <ToolbarItem
          title={ FRIENDS_ITEM() }
          icon="icon--friends"
          onSelect={ @showFriends } />
      <ToolbarItem
          title={ DESIGN_ITEM() }
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) } />
      <ToolbarItem
          title={ SETTINGS_ITEM() }
          icon="icon--cogwheel"
          href={ Routes.userSettings(@props.user.slug) } />
      <ToolbarItem
          title={ LOGOUT_ITEM() }
          href={ Routes.logout_path(@props.user.slug) }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList