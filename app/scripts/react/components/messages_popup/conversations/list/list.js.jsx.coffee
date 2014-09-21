###* @jsx React.DOM ###

window.MessagesPopup_ConversationsList = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

    ConversationsStore.addChangeListener @_onStoreChange

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger('sizeChange').trigger 'sizeChange'

    ConversationsStore.removeChangeListener @_onStoreChange

  componentWillUnmount: ->
    @scroller.dispose()
    @$scroller = @scroller = null

  render: ->
    conversations = @state.activeConversations.map (conversation, i) ->
      `<MessagesPopup_ConversationsListItem conversation={ conversation }
                                            key={ conversation.id } />`

    return `<div className="messages__body">
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
            </div>`

  getStateFromStore: ->
    activeConversations: ConversationsStore.getActiveConversations()

  _onStoreChange: ->
    @setState @getStateFromStore()