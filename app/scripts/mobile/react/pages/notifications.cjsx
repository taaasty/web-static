CurrentUserStore       = require '../stores/currentUser'
NotificationStore      = require '../stores/notification'
PageMixin              = require './mixins/page'
NotificationsPageMixin = require './mixins/notifications'
FeedToolbarManager     = require '../components/toolbars/feedManager'
UserToolbarManager     = require '../components/toolbars/userManager'
Notifications          = require '../components/notifications/notifications'
{ PropTypes } = React

NotificationsPage = React.createClass
  displayName: 'NotificationsPage'
  mixins: [PageMixin, NotificationsPageMixin]

  propTypes:
    currentUser:   PropTypes.object.isRequired
    tlog:          PropTypes.object.isRequired
    notifications: PropTypes.array.isRequired

  componentWillMount: ->
    # Temporarily initialize CurrentUserStore here. Later on it will be set at
    # root App component
    # Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize @props.currentUser
    NotificationStore.initialize @props.notifications

  render: ->
    <div>
      <FeedToolbarManager />
      <UserToolbarManager />
      <div className="layout">
        <div className="layout__body">
          <Notifications notifications={ @props.notifications } />
        </div>
      </div>
    </div>

module.exports = NotificationsPage