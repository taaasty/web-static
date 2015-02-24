ConversationListEmpty = React.createClass
  displayName: 'ConversationListEmpty'

  render: ->
    <div className="messages__scroll">
      <p className="messages__text messages__text--center">
        { i18n.t('messenger.conversations_empty_list') }
      </p>
    </div>

module.exports = ConversationListEmpty