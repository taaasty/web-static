CurrentUserStore     = require '../../stores/currentUser'
MessagingStatusStore = require '../../stores/messagingStatus'
ConnectStoreMixin    = require '../../../../shared/react/mixins/connectStore'
UserToolbar          = require './user'

UserToolbarManager = React.createClass
  displayName: 'UserToolbarManager'
  mixins: [ConnectStoreMixin([CurrentUserStore, MessagingStatusStore])]

  render: ->
    if @state.logged
      <UserToolbar
          user={ @state.user }
          unreadConversationsCount={ @state.unreadConversationsCount }
          unreadNotificationsCount={ @state.unreadNotificationsCount } />
    else null

  getStateFromStore: ->
    user:                     CurrentUserStore.getUser()
    logged:                   CurrentUserStore.isLogged()
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()

module.exports = UserToolbarManager