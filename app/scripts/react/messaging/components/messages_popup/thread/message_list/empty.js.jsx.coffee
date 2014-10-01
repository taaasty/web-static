###* @jsx React.DOM ###

window.MessagesPopup_MessageListEmpty = React.createClass

  render: ->
   `<div className="messages__list-cell">
      <div className="messages__empty">
        <div className="messages__empty-text">Здесь будут отображаться сообщения</div>
      </div>
    </div>`