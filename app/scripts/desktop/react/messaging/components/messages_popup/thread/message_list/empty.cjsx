window.MessagesPopup_MessageListEmpty = React.createClass

  render: ->
    <div className="messages__empty">
      <div className="messages__empty-text">
        { i18n.t("messages_empty_list") }
      </div>
    </div>