NotificationStore       = require '../../stores/notification'
ConnectStoreMixin       = require '../../../../shared/react/mixins/connectStore'
ComponentMixin          = require '../../mixins/component'
NotificationsMixin      = require './mixins/notifications'
NotificationsMarkButton = require './buttons/mark'
NotificationsHeader     = require './header'
NotificationList        = require './list'
NotificationsLoadMore   = require './loadMore'
{ PropTypes } = React

Notifications = React.createClass
  displayName: 'Notifications'
  mixins: [ConnectStoreMixin(NotificationStore), NotificationsMixin, ComponentMixin]

  render: ->
    <div className="notifications">
      <NotificationsHeader />
      <div className="notifications__body">
        { @renderActions() }
        <div className="notifications__content">
          <NotificationList
              items={ @state.notifications }
              onItemRead={ @markAsRead } />
        </div>
        { @renderLoadMore() }
      </div>
    </div>

  renderActions: ->
    if @hasUnreadNotifications()
      <div className="notifications__actions">
        <NotificationsMarkButton onClick={ @markAllAsRead } />    
      </div>

  renderLoadMore: ->
    if @state.notifications.length && !@state.everythingLoaded
      <NotificationsLoadMore
          loading={ @isLoadingState() }
          onClick={ @loadMore } />

  getStateFromStore: ->
    notifications:    NotificationStore.getAll()
    everythingLoaded: NotificationStore.isEverythingLoaded()

module.exports = Notifications