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
          title={ i18n.t('toolbar_new_entry_item') }
          href={ this.props.newEntryUrl }
          icon="icon--plus" />
      <ToolbarItem
          title={ i18n.t('toolbar_my_diary_item') }
          href={ this.props.myTlogUrl }
          icon="icon--diary" />
      <ToolbarItem
          title={ i18n.t('toolbar_profile_item') }
          icon="icon--profile"
          onSelect={ this.showProfile } />
      <ToolbarItem
          title={ i18n.t('toolbar_favorites_item') }
          href={ this.props.favoritesUrl }
          icon="icon--star" />
      <ToolbarItem
          title={ i18n.t('toolbar_new_anonymous_item') }
          href={ this.props.newAnonymousEntryUrl }
          icon="icon--anonymous" />
      <ToolbarItem
          title={ i18n.t('toolbar_privates_item') }
          href={ this.props.privateEntriesUrl }
          icon="icon--lock" />
      <ToolbarItem
          title={ i18n.t('toolbar_messages_item') }
          icon="icon--messages"
          onSelect={ this.showMessages } />
      <ToolbarItem
          title={ i18n.t('toolbar_friends_item') }
          icon="icon--friends"
          onSelect={ this.showFriends } />
      <ToolbarItem
          title={ i18n.t('toolbar_design_item') }
          icon="icon--drawing"
          onSelect={ this.showDesignSettings } />
      <ToolbarItem
          title={ i18n.t('toolbar_settings_item') }
          icon="icon--cogwheel"
          onSelect={ this.showSettings } />
      <ToolbarItem
          title={ i18n.t('toolbar_logout_item') }
          href={ this.props.logoutUrl }
          icon="icon--logout" />
    </ul>

module.exports = UserToolbarList

# <ToolbarItem
#   title="Мобильная версия"
#   href={ this.props.mobileUrl }
#   icon="icon--mobile" />