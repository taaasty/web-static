###* @jsx React.DOM ###

window.IndicatorsToolbar_Messages = React.createClass

  getInitialState: ->
    currentState: ConnectionStateStore.NOT_CONNECTED_STATE
    unreadConversationsCount: '?'

  getStateFromStores: ->
    currentState:             ConnectionStateStore.getConnectionState()
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  componentDidMount: ->
    ConnectionStateStore.addUpdateListener =>
      @setState
        currentState: ConnectionStateStore.getConnectionState()

    MessagingStatusStore.addChangeListener =>
      @setState
        unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
        activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  render: ->
    switch @state.currentState
      when ConnectionStateStore.ERROR_STATE
        content = `<span className="error-badge">?</span>`

      when ConnectionStateStore.CONNECTED_STATE
        content = `<span className="messages-badge">
                        { this.state.unreadConversationsCount }
                   </span>`
      else
        content = `<Spinner size={ 15 } />`

    return `<div className="toolbar__indicator"
                 onClick={ this.handleClick }>
              { content }
            </div>`

  handleClick: ->
    switch @state.currentState
      when ConnectionStateStore.CONNECTED_STATE then messagingService.toggleMessagesPopup()
      when ConnectionStateStore.ERROR_STATE     then messagingService.reconnect()
      else null

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()