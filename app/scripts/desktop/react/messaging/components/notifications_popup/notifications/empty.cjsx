window.NotificationsPopup_NotificationsEmpty = React.createClass

  render: ->
    <div className="notifications__empty">
      { i18n.t('notifications_empty_list') }
    </div>