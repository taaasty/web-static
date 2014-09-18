###* @jsx React.DOM ###

window.MessagesPopup_ConversationList = React.createClass

  propTypes:
    onClickConversation:     React.PropTypes.func.isRequired
    onCreateNewConversation: React.PropTypes.func.isRequired

  getInitialState: ->
    @getStateFromStores()

  componentDidMount: ->
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

    ConversationsStore.addChangeListener @getStateFromStores

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger('sizeChange').trigger 'sizeChange'
    ConversationsStore.removeChangeListener @getStateFromStores

  componentWillUnmount: ->
    @scroller.dispose()
    @$scroller = @scroller = null

  render: ->
    that = @
    conversations = @state.activeConversations.map (conversation, i) ->
      `<MessagesPopup_ConversationListItem conversation={ conversation }
                                           onClick={ that.props.onClickConversation }
                                           key={ conversation.id } />`

    return `<div className="messages__section messages__section--dialogs">
              <div className="messages__body">
                <div ref="scroller"
                     className="scroller scroller--dark">
                  <div className="scroller__pane js-scroller-pane">
                    <div className="messages__dialogs">
                      { conversations }
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

  getStateFromStores: ->
    activeConversations: ConversationsStore.getActiveConversations()
