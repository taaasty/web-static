_                         = require 'lodash'
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
{ PropTypes } = React

SEARCH_TITLE_I18N_KEYS = ['live', 'best', 'friends', 'anonymous', 'mytlog', 'tlog', 'favorites', 'privates', 'people']

UserToolbar = React.createClass
  displayName: 'UserToolbar'
  mixins: [ConnectStoreMixin([CurrentUserStore, MessagingStatusStore])]

  propTypes:
    searchUrl: PropTypes.string.isRequired
    searchTitleI18nKey: PropTypes.oneOf(SEARCH_TITLE_I18N_KEYS).isRequired

  getInitialState: ->
    _.extend @getStateFromLocalStorage(), hover: false

  componentWillMount: ->
    UserToolbarActions.initVisibility @state.open

  render: ->
    navbarClasses = cx
      'toolbar__navbar': true
      'toolbar__navbar--complex': @state.logged

    <div className="toolbar toolbar--main"
         onMouseEnter={ @handleMouseEnter }
         onMouseLeave={ @handleMouseLeave }>
      <UserToolbarToggle
          hasConversations={ !!@state.unreadConversationsCount }
          hasNotifications={ !!@state.unreadNotificationsCount }
          onClick={ @toggleVisibility } />
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
          stayOpen={ @state.hover }
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
          searchTitleI18nKey={ @props.searchTitleI18nKey }
          onSettingsItemClick={ @showSettings }
          onSearchItemClick={ @showSearch } />

  toggleVisibility: ->
    visibility = !@state.open

    localStorage.setItem 'states:mainToolbarOpened', visibility
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

  showSearch: ->
    PopupActions.showSearch
      searchUrl: @props.searchUrl
      searchTitleI18nKey: @props.searchTitleI18nKey

  handleMouseEnter: ->
    @setState(hover: true)

  handleMouseLeave: ->
    @setState(hover: false)

  getStateFromLocalStorage: ->
    storedState = localStorage.getItem 'states:mainToolbarOpened'

    return {
      open: if storedState? then JSON.parse(storedState) else true
    }

  getStateFromStore: ->
    user:                     CurrentUserStore.getUser()
    logged:                   CurrentUserStore.isLogged()
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()

module.exports = UserToolbar