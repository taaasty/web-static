window.MessagesPopup_Conversations = React.createClass

  render: ->
    <div className="messages__section messages__section--dialogs">
      <MessagesPopup_ConversationsList />
      <footer className="messages__footer">
        <MessagesPopup_UICreateNewConversationButton onClick={ this.handleCreateNewConversation } />
      </footer>
    </div>

  handleCreateNewConversation: ->
    MessagingDispatcher.handleViewAction {
      type: 'clickNewConversation'
    }