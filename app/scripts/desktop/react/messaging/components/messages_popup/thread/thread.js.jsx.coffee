###* @jsx React.DOM ###

window.MessagesPopup_Thread = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired
  
  getInitialState: ->
    conversation: ConversationsStore.getConversation @props.conversationId

  render: ->
    backgroundUrl = @state.conversation.recipient.design.background_url
    threadStyles  = {
      'background-image': "url(#{ backgroundUrl })"
    }

    return `<div className="messages__section messages__section--thread">
              <div className="messages__body" style={ threadStyles }>
                <div className="messages__thread-overlay" />
                <MessagesPopup_ThreadMessageList conversationId={ this.props.conversationId} />
              </div>
              <footer className="messages__footer">
                <MessagesPopup_ThreadMessageForm conversationId={ this.props.conversationId } />
              </footer>
            </div>`