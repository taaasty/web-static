NotificationsHeader = React.createClass
  displayName: 'NotificationsHeader'

  render: ->
    <div className="notifications__header">
      <h3 className="notifications__title">
        { i18n.t('notifications.header') }
      </h3>
    </div>

module.exports = NotificationsHeader