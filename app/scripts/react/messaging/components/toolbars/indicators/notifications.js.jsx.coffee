###* @jsx React.DOM ###

window.IndicatorsToolbar_Notifications = React.createClass

  render: ->
   `<div className="toolbar__indicator"
         onClick={ this.handleClick }>
      <span className="notifications-badge">13</span>
    </div>`

  handleClick: ->
    PopupActions.toggleNotificationsPopup()