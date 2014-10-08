###* @jsx React.DOM ###

window.NotificationsPopup = React.createClass

  render: ->
   `<div className="popup popup--notifications popup--dark"
         style={{ top: '94px', right: '20px', display: 'block' }}>
      <div className="popup__arrow popup__arrow--up" />
      <div className="popup__content">
        <div className="popup__body">
          <div className="notifications">
            <NotificationsPopup_Notifications />
          </div>
        </div>
      </div>
    </div>`