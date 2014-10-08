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

    if @hasUnreadConversations()
      return `<div className="toolbar__indicator"
                   onClick={ this.handleClick }>
                { content }
              </div>`
    else
      return null

  handleClick: ->
    switch @state.currentState
      when ConnectionStateStore.CONNECTED_STATE then PopupActions.toggleMessagesPopup()
      when ConnectionStateStore.ERROR_STATE     then messagingService.reconnect()
      else null

  hasUnreadConversations: -> !!@state.unreadConversationsCount

  _onChange: ->
    @setState @getStateFromStores()