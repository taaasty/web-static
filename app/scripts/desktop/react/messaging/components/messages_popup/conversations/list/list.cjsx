window.MessagesPopup_ConversationsList = React.createClass
  mixins: [ScrollerMixin]

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    ConversationsStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    ConversationsStore.removeChangeListener @_onStoreChange

  render: ->
    if @isEmpty()
      conversations = <MessagesPopup_ConversationsListEmpty />
    else
      conversations = @state.activeConversations.map (conversation, i) ->
        <MessagesPopup_ConversationsListItem conversation={ conversation }
                                             key={ conversation.id } />

    return <div className="messages__body">
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

  isEmpty: -> @state.activeConversations.length == 0

  getStateFromStore: ->
    activeConversations: ConversationsStore.getActiveConversations()

  _onStoreChange: ->
    @setState @getStateFromStore()