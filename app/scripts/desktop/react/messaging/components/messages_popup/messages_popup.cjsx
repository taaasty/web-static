MESSAGES_POPUP_TITLE  = 'Мои переписки'
MESSAGES_THREAD_TITLE = 'Переписка с #{name}'
CONVERSATIONS_STATE           = 'conversations'
CREATE_NEW_CONVERSATION_STATE = 'createNewConversation'
THREAD_STATE                  = 'thread'
ENTER_TIMEOUT = 300
LEAVE_TIMEOUT = 300

#TODO: Restore TimeoutTransitionGroup after upgrate to 0.12.2

window.MessagesPopup = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', RequesterMixin]

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagesPopupStateStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    MessagesPopupStateStore.removeChangeListener @_onStoreChange

  render: ->
    popupTitle = @getPopupTitle()

    switch @state.currentState
      when CONVERSATIONS_STATE
        content         = <MessagesPopup_Conversations key="conversations" />
        transitionName  = 'conversations'
      when CREATE_NEW_CONVERSATION_STATE
        content         = <MessagesPopup_CreateNewConversation key="newConversation" />
        transitionName  = 'new-conversation'
      when THREAD_STATE
        content         = <MessagesPopup_Thread conversationId={ this.state.currentConversationId }
                                                key="thread" />
        transitionName  = 'thread'

    unless @isConversationsState()
      backButton = <MessagesPopup_UIBackButton onClick={ this.handleBackButtonClick } />

    return <Popup hasActivities={ this.hasActivities() }
                  title={ popupTitle }
                  type="messages"
                  isDraggable={ true }
                  colorScheme="light"
                  position={{ top: 30, left: 30 }}
                  className="popup--messages"
                  onClose={ PopupActions.closeMessagesPopup }>

             <div className="messages">
               { backButton }
               { content }
             </div>

           </Popup>

  isConversationsState:         -> @state.currentState is CONVERSATIONS_STATE
  isCreateNewConversationState: -> @state.currentState is CREATE_NEW_CONVERSATION_STATE
  isThreadState:                -> @state.currentState is THREAD_STATE

  getStateFromStore: ->
    currentState:          MessagesPopupStateStore.getCurrentState()
    currentConversationId: MessagesPopupStateStore.getCurrentConversationId()

  getPopupTitle: ->
    if @isThreadState()
      conversation  = ConversationsStore.getConversation @state.currentConversationId
      recipientSlug = conversation.recipient.slug
      popupTitle    = MESSAGES_THREAD_TITLE.replace /#{.+}/, recipientSlug
    else
      popupTitle = MESSAGES_POPUP_TITLE

    popupTitle

  handleBackButtonClick: ->
    MessagingDispatcher.handleViewAction(type: 'clickBackButton')

  _onStoreChange: ->
    @setState @getStateFromStore()