MessageStore         = require '../../../stores/message'
ConversationStore    = require '../../../stores/conversation'
MessengerViewActions = require '../../../actions/view/messenger'
ConnectStoreMixin    = require '../../../../../shared/react/mixins/connectStore'
ComponentMixin       = require '../../../mixins/component'
Spinner              = require '../../common/spinner/spinner'
MessageList          = require './messages/list'

LOADED_STATE  = 'loaded'
LOADING_STATE = 'loading'

ConversationMessages = React.createClass
  displayName: 'ConversationMessages'
  mixins: [ConnectStoreMixin(MessageStore), ComponentMixin]

  getInitialState: ->
    currentState: LOADING_STATE

  componentWillMount: ->
    MessengerViewActions.loadMessages ConversationStore.getCurrentID()
      .then @activateLoadedState

  render: ->
    if @isLoadedState() or @hasMessages()
      # Выводим сообщения если загрузили их, либо выводим сообщения из стора если есть
      <MessageList items={ @state.messages } />
    else
      #FIXME: Нужно уменьшить вложенность элементов для вывода текстов сообщений по центру
      <div className="messages__scroll">
        <div className="messages__list">
          <div className="messages__list-cell">
            <div className="messages__empty">
              <div className="messages__empty-text">
                <Spinner size={ 24 } />
              </div>
            </div>
          </div>
        </div>
      </div>

  isLoadedState: -> @state.currentState is LOADED_STATE

  hasMessages: -> !!@state.messages.length

  activateLoadedState:  -> @safeUpdateState(currentState:LOADED_STATE)
  activateLoadingState: -> @safeUpdateState(currentState:LOADING_STATE)

  getStateFromStore: ->
    messages: MessageStore.getAllForCurrentThread()

module.exports = ConversationMessages