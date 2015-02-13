_                       = require 'lodash'
NotificationStore       = require '../../stores/notification'
ConnectStoreMixin       = require '../../../../shared/react/mixins/connectStore'
NotificationsMixin      = require './mixins/notifications'
NotificationsMarkButton = require './buttons/mark'
NotificationsHeader     = require './header'
NotificationsList       = require './list'
{ PropTypes } = React

Notifications = React.createClass
  displayName: 'Notifications'
  mixins: [ConnectStoreMixin(NotificationStore), NotificationsMixin]

  propTypes:
    notifications: PropTypes.array.isRequired

  render: ->
    <div className="notifications">
      <NotificationsHeader />
      <div className="notifications__body">
        { @renderActions() }
        <div className="notifications__content">
          <NotificationsList notifications={ @props.notifications } />
        </div>
      </div>
    </div>

  renderActions: ->
    if @hasUnreadNotifications()
      <div className="notifications__actions">
        <NotificationsMarkButton onClick={ @markAllAsRead } />    
      </div>

  hasUnreadNotifications: ->
    unreadItems = _.filter @props.notifications, (item) ->
      item.read_at is null

    !!unreadItems.length

  getStateFromStore: ->
    notifications: NotificationStore.getAll()

module.exports = Notifications