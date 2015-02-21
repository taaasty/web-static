MessageListEmpty = React.createClass
  displayName: 'MessageListEmpty'

  render: ->
    <div className="messages__scroll">
      <p className="messages__text messages__text--center">
        Здесь будут отображаться сообщения
      </p>
    </div>

module.exports = MessageListEmpty