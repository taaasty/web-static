NotificationsListEmpty = React.createClass

  render: ->
    <p className="notifications__text notifications__text--center">
      { i18n.t('notifications.empty_list') }
    </p>

module.exports = NotificationsListEmpty