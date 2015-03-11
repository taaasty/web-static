MessageStore = require '../../../stores/message'
ConversationStore = require '../../../stores/conversation'
MessengerViewActions = require '../../../actions/view/messenger'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
ComponentMixin = require '../../../mixins/component'
Spinner = require '../../common/spinner/spinner'
MessageList = require './messages/list'

LOADED_STATE       = 'loaded'
LOADING_STATE      = 'loading'
LOADING_MORE_STATE = 'loadingMore'
ERROR_STATE        = 'error'

ConversationMessages = React.createClass
  displayName: 'ConversationMessages'
  mixins: [ConnectStoreMixin(MessageStore), ComponentMixin]

  getInitialState: ->
    currentState: LOADING_STATE
    allHistoryLoaded: false

  componentDidMount: ->
    currentConvID = ConversationStore.getCurrentID()

    MessengerViewActions.loadMessages currentConvID
      .then @activateLoadedState
      .fail @activateErrorState

  componentWillUpdate: ->
    currentConvID = ConversationStore.getCurrentID()
    unreadIDs = MessageStore.getUnreadIDs currentConvID

    if unreadIDs.length
      MessengerViewActions.readMessages currentConvID, unreadIDs

  render: ->
    if @isLoadedState() or @hasMessages()
      canLoad = !@isLoadingMoreState() && !@state.allHistoryLoaded
      # Выводим сообщения если загрузили их, либо выводим сообщения из стора если есть
      <MessageList
          items={ @state.messages }
          canLoad={ canLoad }
          onLoadMore={ @loadMore } />
    else if @isLoadingState()
      <div className="messages__scroll">
        <p className="messages__text messages__text--center">
          <Spinner size={ 24 } />
        </p>
      </div>
    else
      <div className="messages__scroll">
        <p className="messages__text messages__text--center">
          { i18n.t('messenger.messages_loading_error') }
        </p>
      </div>

  isLoadedState:      -> @state.currentState is LOADED_STATE
  isLoadingState:     -> @state.currentState is LOADING_STATE
  isLoadingMoreState: -> @state.currentState is LOADING_MORE_STATE

  hasMessages: -> !!@state.messages.length

  activateLoadedState:      -> @safeUpdateState(currentState: LOADED_STATE)
  activateLoadingMoreState: -> @safeUpdateState(currentState: LOADING_MORE_STATE)
  activateErrorState:       -> @safeUpdateState(currentState: ERROR_STATE)

  loadMore: ->
    @activateLoadingMoreState()

    MessengerViewActions.loadMoreMessages ConversationStore.getCurrentID(), @state.messages[0].id
      .then (response) =>
        if response.messages.length == 0
          @safeUpdateState
            allHistoryLoaded: true
            currentState: LOADED_STATE
        else
          @activateLoadedState()

  getStateFromStore: ->
    messages: MessageStore.getAllForCurrentThread()

module.exports = ConversationMessages