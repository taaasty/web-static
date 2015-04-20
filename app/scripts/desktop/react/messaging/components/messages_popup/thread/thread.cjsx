window.MessagesPopup_Thread = React.createClass
  displayName: 'MessagesPopup_Thread'

  propTypes:
    conversationId: React.PropTypes.number.isRequired
  
  getInitialState: ->
    conversation: ConversationsStore.getConversation @props.conversationId

  render: ->
    backgroundUrl = @state.conversation.recipient.design.backgroundImageUrl
    threadStyles  =
      backgroundImage: "url(#{ backgroundUrl })"

    return <div className="messages__section messages__section--thread">
             <div className="messages__body" style={ threadStyles }>
               <div className="messages__thread-overlay" />
               <MessagesPopup_ThreadMessageList conversationId={ this.props.conversationId} />
             </div>
             <footer className="messages__footer">
               <MessagesPopup_ThreadMessageForm conversationId={ this.props.conversationId } />
             </footer>
           </div>