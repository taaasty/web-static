###* @jsx React.DOM ###

window.MessagesPopup_Thread = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired
  
  getInitialState: ->
    isEmpty:      false
    conversation: ConversationsStore.getConversation @props.conversationId

  componentDidMount: ->
    messagingService.bindPushMessages()

  componentWillUnmount: ->
    messagingService.unbindPushMessages()

  render: ->
    if @state.isEmpty
      thread = `<MessagesPopup_ThreadEmpty />`
    else
      thread = `<MessagesPopup_ThreadMessageList conversationId={ this.props.conversationId} />`

    return `<div className="messages__section messages__section--thread">
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
                { thread }
              </div>
              <footer className="messages__footer">
                <MessagesPopup_ThreadMessageForm conversationId={ this.props.conversationId } />
              </footer>
            </div>`

  _getHeroStyle: ->
    backgroundUrl = @state.conversation.recipient.design.background_url

    # 'background-image': "url(http://taaasty.ru/assets/backgrounds/da/9c/1881243_1881243_03012_treesbythewater_3840x2160.jpg)"
    'background-image': "url(#{ backgroundUrl })"