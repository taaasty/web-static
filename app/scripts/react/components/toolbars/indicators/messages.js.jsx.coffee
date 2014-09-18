###* @jsx React.DOM ###

LOADING_STATE = 'loading'
ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'

window.IndicatorsToolbar_Messages = React.createClass

  getInitialState: ->
    currentState: LOADING_STATE
    totalUnreadConversationsCount: '?'
    isPopupShown: false

  getStateFromStores: ->
    currentState: LOADED_STATE
    totalUnreadConversationsCount: MessagingStatusStore.getTotalUnreadConversationsCount()

  componentDidMount: ->
    if window.messagingService?
      @connectToMessagingService()
    else
      connection = setInterval (=>
        if window.messagingService?
          @connectToMessagingService()
          clearInterval connection
      ), 1000

  componentWillUnmount: ->
    window.messagingService.close()

  render: ->
    switch @state.currentState
      when LOADING_STATE then content = `<Spinner size={ 15 } />`
      when ERROR_STATE   then content = `<span className="error-badge">O_o</span>`
      when LOADED_STATE  then content = `<span className="messages-badge">
                                           { this.state.totalUnreadConversationsCount }
                                         </span>`

    return `<div className="toolbar__indicator"
                 onClick={ this.handleClick }>
              { content }
            </div>`

  connectToMessagingService: ->
    @setState(currentState: LOADING_STATE) unless @state.currentState is 'LOADING_STATE'

    window.messagingService.connect
      connectError:   =>  @setState(currentState: ERROR_STATE)
      connectSuccess: @successfulConnected
      statusUpdate:   @statusUpdate

  toggleMessagesPopup: ->
    messagesContainer = document.querySelector '[popup-messages-container]'

    unless messagesContainer
      messagesContainer = $('<\div>', {'popup-messages-container': ''}).appendTo('body')[0]

    if @state.isPopupShown
      React.unmountComponentAtNode messagesContainer
    else
      React.renderComponent MessagesPopup({ onClose: @handlePopupClose }), messagesContainer

    @setState isPopupShown: !@state.isPopupShown

  successfulConnected: (messagingInfo) ->
    @setState(currentState: LOADED_STATE)

  statusUpdate: (messagingStatus) ->
    @setState(currentState: LOADED_STATE)

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then @toggleMessagesPopup()
      when ERROR_STATE  then @connectToMessagingService()
      else null

  handlePopupClose: -> @setState isPopupShown: false

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()
