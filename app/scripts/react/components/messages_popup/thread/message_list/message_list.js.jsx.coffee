###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageList = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger('sizeChange').trigger 'sizeChange'

  componentWillUnmount: ->
    @scroller.dispose()
    @$scroller = @scroller = null

  render: ->
    that = @
    messages = @state.messages.map (message) ->
      `<MessagesPopup_ThreadMessageListItem message={ message }
                                            conversationId={ that.props.conversationId }
                                            key={ message.id } />`

    return `<div ref="scroller"
                 className="scroller scroller--dark scroller--messages">
              <div className="scroller__pane js-scroller-pane">
                <div className="messages__list">
                  <div className="messages__list-cell js-messages-list">
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
    messages: ConversationsStore.getMessagesOfConversation @props.conversationId