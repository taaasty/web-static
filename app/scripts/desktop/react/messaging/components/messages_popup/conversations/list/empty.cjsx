window.MessagesPopup_ConversationsListEmpty = React.createClass

  render: ->
    <div className="messages__list-cell">
      <div className="messages__empty">
        <div className="messages__empty-text">
          { i18n.t('conversations_empty_list') }
        </div>
      </div>
    </div>