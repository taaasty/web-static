###* @jsx React.DOM ###

LOADING_STATE = 'loading'
ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'

window.IndicatorsToolbar_Messages = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  getInitialState: ->
    currentState: LOADING_STATE
    totalUnreadConversationsCount: ''
    activeConversations: []

  componentDidMount: ->
    @messagingService = new MessagingService {
      debug: true
      user:  @props.user
    }

    @connectToMessagingService()

  componentWillUnmount: ->
    @messagingService = null

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
      success: (metaInfo) =>
        @setState {
          currentState: LOADED_STATE
          totalUnreadConversationsCount: metaInfo.status.totalUnreadConversationsCount
          activeConversations: metaInfo.activeConversations
        }
        console.info 'Соединение с сервером сообщений установлено', metaInfo
      error: =>
        @setState(currentState: ERROR_STATE)
        console.error 'Ошибка при соединении с сервером сообщений'

    @messagingService.bindMessagingStatusUpdate (messagingStatus) =>
      console.info 'Обновился messagingStatus', messagingStatus
      @setState {
        currentState: LOADED_STATE
        totalUnreadConversationsCount: messagingStatus.totalUnreadConversationsCount
      }

  handleClick: ->
    switch @state.currentState
      when LOADED_STATE then console.log 'Открываем попап с сообщениями'
      when ERROR_STATE  then @connectToMessagingService()
      else null