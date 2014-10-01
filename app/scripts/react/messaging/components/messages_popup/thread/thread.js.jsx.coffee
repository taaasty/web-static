###* @jsx React.DOM ###

window.MessagesPopup_Thread = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired
  
  getInitialState: ->
    conversation: ConversationsStore.getConversation @props.conversationId

  render: ->
   `<div className="messages__section messages__section--thread">
      <header className="messages__header">
        <div className="messages__hero" style={ this._getHeroStyle() }>
          <div className="messages__hero-overlay" />
          <div className="messages__hero-box">
            <div className="messages__hero-avatar">
              <a href={ this.state.conversation.recipient.tlog_url }
                 target="_blank">
                <UserAvatar user={ this.state.conversation.recipient } size={ 70 } />
              </a>
            </div>
            <div className="messages__hero-name">{ this.state.conversation.recipient.slug }</div>
          </div>
        </div>
      </header>
      <div className="messages__body">
        <MessagesPopup_ThreadMessageList conversationId={ this.props.conversationId} />
      </div>
      <footer className="messages__footer">
        <MessagesPopup_ThreadMessageForm conversationId={ this.props.conversationId } />
      </footer>
    </div>`

  _getHeroStyle: ->
    backgroundUrl = @state.conversation.recipient.design.background_url

    'background-image': "url(#{ backgroundUrl })"