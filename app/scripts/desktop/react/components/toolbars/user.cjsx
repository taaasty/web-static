cx                        = require 'react/lib/cx'
CurrentUserStore          = require '../../stores/current_user'
MessagingStatusStore      = require '../../messaging/stores/messaging_status'
ConnectStoreMixin         = require '../../../../shared/react/mixins/connectStore'
UserToolbarActions        = require '../../actions/userToolbar'
PopupActions              = require '../../actions/popup'
Scroller                  = require '../common/scroller/scroller'
UserToolbarToggle         = require './user/toggle'
UserToolbarList           = require './user/list'
UserToolbarGuestList      = require './user/guestList'
UserToolbarAdditionalList = require './user/additionalList'

UserToolbar = React.createClass
  displayName: 'UserToolbar'
  mixins: [ConnectStoreMixin([CurrentUserStore, MessagingStatusStore])]

  getInitialState: ->
    open: false

  render: ->
    navbarClasses = cx
      'toolbar__navbar': true
      'toolbar__popup--complex': @state.logged

    <div className="toolbar toolbar--main">
      <UserToolbarToggle onClick={ @toggleVisibility } />
      <div className={ navbarClasses }>
        <Scroller>
          { @renderList() }
        </Scroller>
        { @renderAdditionList() }
      </div>
    </div>

  renderList: ->
    if @state.logged
      <UserToolbarList
          user={ @state.user }
          unreadConversationsCount={ @state.unreadConversationsCount }
          unreadNotificationsCount={ @state.unreadNotificationsCount }
          onMessagesItemClick={ @toggleMessages }
          onNotificationsItemClick={ @toggleNotifications }
          onFriendsItemClick={ @showFriends }
          onDesignSettingsItemClick={ @showDesignSettings } />
    else
      <UserToolbarGuestList />

  renderAdditionList: ->
    if @state.logged
      <UserToolbarAdditionalList
          user={ @state.user }
          onSettingsItemClick={ @showSettings } />

  toggleVisibility: ->
    visibility = !@state.open

    UserToolbarActions.toggleVisibility visibility
    @setState(open: visibility)

  toggleMessages: ->
    PopupActions.toggleMessages()

  toggleNotifications: ->
    PopupActions.toggleNotifications()
  
  showDesignSettings: ->
    PopupActions.showDesignSettings()
  
  showFriends: ->
    PopupActions.showFriends()

  showSettings: ->
    PopupActions.showSettings()

  getStateFromStore: ->
    user:                     CurrentUserStore.getUser()
    logged:                   CurrentUserStore.isLogged()
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()

module.exports = UserToolbar