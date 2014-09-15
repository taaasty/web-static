###* @jsx React.DOM ###

window.MessagesPopup_ThreadEmpty = React.createClass

  render: ->
   `<div className="messages__list-cell js-messages-list">
      <div className="messages__empty">
        <div className="messages__empty-text">Здесь будут отображаться сообщения</div>
      </div>
    </div>`