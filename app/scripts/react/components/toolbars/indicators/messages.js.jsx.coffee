###* @jsx React.DOM ###

LOADING_STATE = 'loading'
ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'

window.IndicatorsToolbar_Messages = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  getInitialState: ->
    currentState: LOADING_STATE
    totalUnreadConversationsCount: MessagingStatusStore.getTotalUnreadConversationsCount()

  getStateFromStores: ->
    return {
      currentState: LOADED_STATE
      totalUnreadConversationsCount: MessagingStatusStore.getTotalUnreadConversationsCount()
    }

  componentDidMount: ->
    @connectToMessagingService()
    MessagingStatusStore.addChangeListener @_onChange

  componentWillUnmount: ->
    MessagingStatusStore.removeChangeListener @_onChange

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
    @setState(currentState: LOADING_STATE) unless @state.currentState is LOADING_STATE

    MessagingService.connect
      success: => @setState(currentState: LOADED_STATE)
      error:   => @setState(currentState: ERROR_STATE)

  toggleMessagesPopup: ->
    unless messagesNode = document.querySelector '[popup-messages-container]'
      messagesNode = document.createElement 'div'
      messagesAttr = document.createAttribute 'popup-messages-container'
      messagesNode.setAttributeNode messagesAttr
      document.body.appendChild messagesNode

    if messagesNode.innerHTML is ''
      React.renderComponent MessagesPopup(), messagesNode
    else
      React.unmountComponentAtNode messagesNode
      messagesNode.remove()

    messagesNode = null

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then @toggleMessagesPopup()
      when ERROR_STATE  then @connectToMessagingService()
      else null

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()