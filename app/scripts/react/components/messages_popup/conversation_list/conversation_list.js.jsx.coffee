###* @jsx React.DOM ###

window.MessagesPopup_ConversationList = React.createClass

  propTypes:
    conversations:           React.PropTypes.array
    onClickConversation:     React.PropTypes.func.isRequired
    onCreateNewConversation: React.PropTypes.func.isRequired

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
    conversationListItems = @props.conversations.map (conversationListItem, i) ->
      `<MessagesPopup_ConversationListItem user={ conversationListItem.user }
                                     online={ conversationListItem.online }
                                     lastMessage={ conversationListItem.last_message }
                                     newMessagesCount={ conversationListItem.new_messages_count }
                                     onClick={ that.props.onClickConversation }
                                     key={ conversationListItem.id + i } />`

    return `<div className="messages__section messages__section--dialogs">
              <div className="messages__body">
                <div ref="scroller"
                     className="scroller scroller--dark">
                  <div className="scroller__pane js-scroller-pane">
                    <div className="messages__dialogs">
                      { conversationListItems }
                    </div>
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
              <footer className="messages__footer">
                <MessagesPopup_UICreateNewConversationButton onClick={ this.props.onCreateNewConversation } />
              </footer>
            </div>`