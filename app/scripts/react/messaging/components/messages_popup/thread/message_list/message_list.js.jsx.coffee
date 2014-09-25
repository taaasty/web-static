###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageList = React.createClass
  mixins: [ScrollerMixin]

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    @_scrollToBottom()

    MessagesStore.addChangeListener @_onStoreChange
    messagingService.openConversation @props.conversationId

  componentWillUnmount: ->
    MessagesStore.removeChangeListener @_onStoreChange

  render: ->
    messages = @state.messages.map (message) ->
      `<MessagesPopup_ThreadMessageListItem message={ message }
                                            key={ message.id } />`

    return `<div ref="scroller"
                 className="scroller scroller--dark scroller--messages">
              <div ref="scrollerPane"
                   className="scroller__pane js-scroller-pane"
                   onScroll={ this.handleScroll }>
                <div ref="messageList"
                     className="messages__list">
                  <div className="messages__list-cell">
                    <div className="messages__empty state--hidden">
                      <div className="messages__empty-text">Здесь будут отображаться сообщения</div>
                    </div>
                    { messages }
                  </div>
                </div>
              </div>
              <div className="scroller__track js-scroller-track">
                <div className="scroller__bar js-scroller-bar"></div>
              </div>
            </div>`

  handleScroll: ->
    scrollerNode = @refs.scrollerPane.getDOMNode()

    if scrollerNode.scrollTop == 0 && !@state.isAllMessagesLoaded
      MessageActions.loadMoreMessages {
        conversationId: @props.conversationId
        toMessageId:    @state.messages[0].id
      }

    # messageListNode       = @refs.messageList.getDOMNode()
    # scrollerNode          = @refs.scrollerPane.getDOMNode()
    # scrollerNodeScrollTop = scrollerNode.scrollTop
    # scrollerNodeHeight    = scrollerNode.offsetHeight
    # messageListNodeHeight = messageListNode.offsetHeight
    # scrollProgress        = scrollerNodeScrollTop / (messageListNodeHeight - scrollerNodeHeight)

  getStateFromStore: ->
    messages:            MessagesStore.getMessages @props.conversationId
    isAllMessagesLoaded: MessagesStore.isAllMessagesLoaded @props.conversationId

  _scrollToBottom: ->
    scrollerNode           = @refs.scrollerPane.getDOMNode()
    scrollerNode.scrollTop = scrollerNode.scrollHeight

  _onStoreChange: (type) ->
    scrollerNode = @refs.scrollerPane.getDOMNode()
    scrollHeight = scrollerNode.scrollHeight

    @setState @getStateFromStore()

    if type is 'moreMessagesLoaded'
      scrollerNode.scrollTop = scrollerNode.scrollHeight - scrollHeight
    else
      @_scrollToBottom()