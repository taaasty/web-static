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
    showMessagesPopup: false

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
              <MessagesPopup show={ this.state.showMessagesPopup } />
            </div>`

  connectToMessagingService: ->
    @setState(currentState: LOADING_STATE) unless @state.currentState is 'LOADING_STATE'

    window.messagingService.connect
      success: => @setState(currentState: LOADED_STATE)
      error: =>   @setState(currentState: ERROR_STATE)

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then @setState showMessagesPopup: !@state.showMessagesPopup
      when ERROR_STATE  then @connectToMessagingService()
      else null

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()
