###* @jsx React.DOM ###

window.MessagesPopup_ConversationsListEmpty = React.createClass

  render: ->
   `<div className="messages__list-cell">
      <div className="messages__empty">
        <div className="messages__empty-text">Здесь будут отображаться ваши переписки</div>
      </div>
    </div>`