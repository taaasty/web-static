MessageListEmpty = React.createClass
  displayName: 'MessageListEmpty'

  render: ->
    <div className="messages__scroll">
      <p className="messages__text messages__text--center">
        { i18n.t('messenger.messages_empty_list') }
      </p>
    </div>

module.exports = MessageListEmpty