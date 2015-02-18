NotificationsListEmpty = React.createClass

  render: ->
    <p className="notifications__text notifications__text--empty">
      { i18n.t('notifications.empty_list') }
    </p>

module.exports = NotificationsListEmpty