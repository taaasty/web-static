###* @jsx React.DOM ###

window.NotificationsPopup_NotificationsEmpty = React.createClass

  render: ->
   `<div className="messages__list-cell">
      <div className="messages__empty">
        <div className="messages__empty-text">Нет непросмотренных уведомлений</div>
      </div>
    </div>`