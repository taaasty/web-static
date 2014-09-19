###* @jsx React.DOM ###

LOADING_STATE = 'loading'
ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'

window.IndicatorsToolbar_Messages = React.createClass

  getInitialState: ->
    currentState: LOADING_STATE
    unreadConversationsCount: '·'
    isPopupShown: false

  getStateFromStores: ->
    currentState: LOADED_STATE
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  componentDidMount: ->
    MessagingStatusStore.addConnectSuccessCallback @connectSuccess
    MessagingStatusStore.addConnectErrorCallback   @connectError
    MessagingStatusStore.addChangeListener         @statusUpdate

  render: ->
    switch @state.currentState
      when LOADING_STATE then content = `<Spinner size={ 15 } />`
      when ERROR_STATE   then content = `<span className="error-badge">O_o</span>`
      when LOADED_STATE  then content = `<span className="messages-badge">
                                           { this.state.unreadConversationsCount }
                                         </span>`

    return `<div className="toolbar__indicator"
                 onClick={ this.handleClick }>
              { content }
            </div>`

  connectError: ->
    @setState currentState: ERROR_STATE

  connectSuccess: ->
    @setState currentState: LOADED_STATE

  statusUpdate: ->
    @setState
      unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
      activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then messagingService.toggleMessagesPopup()
      when ERROR_STATE  then @connectToMessagingService()
      else null

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()
