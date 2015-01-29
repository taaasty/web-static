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
          title={ i18n.t('toolbar_new_entry_item') }
          href={ Routes.new_entry_url(@props.user.slug) }
          icon="icon--plus" />
      <ToolbarItem
          title={ i18n.t('toolbar_my_diary_item') }
          href={ Routes.my_tlog_url(@props.user.slug) }
          icon="icon--diary" />
      <ToolbarItem
          title={ i18n.t('toolbar_profile_item') }
          icon="icon--profile"
          href={ Routes.userProfile(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('toolbar_favorites_item') }
          href={ Routes.favorites_url(@props.user.slug) }
          icon="icon--star" />
      <ToolbarItem
          title={ i18n.t('toolbar_new_anonymous_item') }
          href={ Routes.new_anonymous_entry_url(@props.user.slug) }
          icon="icon--anonymous" />
      <ToolbarItem
          title={ i18n.t('toolbar_privates_item') }
          href={ Routes.private_entries_url(@props.user.slug) }
          icon="icon--lock" />
      <ToolbarItem
          title={ i18n.t('toolbar_messages_item') }
          icon="icon--messages"
          onSelect={ @showMessages } />
      <ToolbarItem
          title={ i18n.t('toolbar_friends_item') }
          icon="icon--friends"
          onSelect={ @showFriends } />
      <ToolbarItem
          title={ i18n.t('toolbar_design_item') }
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('toolbar_settings_item') }
          icon="icon--cogwheel"
          href={ Routes.userSettings(@props.user.slug) } />
      <ToolbarItem
          title={ i18n.t('toolbar_logout_item') }
          href={ Routes.logout_path(@props.user.slug) }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList