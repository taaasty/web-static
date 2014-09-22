###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageList = React.createClass
  mixins: [ScrollerMixin]

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagesStore.addChangeListener @_onStoreChange
    messagingService.openConversation @props.conversationId

  componentDidUpdate: -> @_scrollToBottom()

  componentWillUnmount: ->
    MessagesStore.removeChangeListener @_onStoreChange

  render: ->
    messages = @state.messages.map (message) ->
      `<MessagesPopup_ThreadMessageListItem message={ message }
                                            key={ message.id } />`

    return `<div ref="scroller"
                 className="scroller scroller--dark scroller--messages">
              <div ref="scrollerPane"
                   className="scroller__pane js-scroller-pane">
                <div className="messages__list">
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

  getStateFromStore: ->
    messages: MessagesStore.getMessages @props.conversationId

  _scrollToBottom: ->
    node           = @refs.scrollerPane.getDOMNode()
    node.scrollTop = node.scrollHeight

  _onStoreChange: ->
    @setState @getStateFromStore()