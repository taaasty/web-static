ConversationListEmpty = React.createClass
  displayName: 'ConversationListEmpty'

  render: ->
    <div className="messages__scroll">
      <p className="messages__text messages__text--center">
        Список диалогов пуст
      </p>
    </div>

module.exports = ConversationListEmpty