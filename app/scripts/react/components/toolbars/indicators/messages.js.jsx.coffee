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
    @messagingService = new MessagingService {
      debug: true
      user:  @props.user
    }
    @connectToMessagingService()

    MessagingStatusStore.addChangeListener @_onChange

  componentWillUnmount: ->
    @messagingService = null
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
    @setState(currentState: LOADING_STATE) unless @state.currentState is 'LOADING_STATE'

    @messagingService.connect
      success: => @setState(currentState: LOADED_STATE)
      error: =>   @setState(currentState: ERROR_STATE)

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then console.log 'Открываем попап с сообщениями'
      when ERROR_STATE  then @connectToMessagingService()
      else null

  # /**
  #  * Event handler for 'change' events coming from the MessagingStatusStore
  #  */
  _onChange: ->
    @setState @getStateFromStores()