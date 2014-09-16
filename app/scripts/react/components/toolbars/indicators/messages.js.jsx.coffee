###* @jsx React.DOM ###

LOADING_STATE = 'loading'
ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'

window.IndicatorsToolbar_Messages = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  getInitialState: ->
    currentState: LOADING_STATE

  componentDidMount: ->
    @messagingService = new MessagingService {
      debug: true
      user:  @props.user
    }

    @messagingService.connect
      success: (metaInfo) =>
        console.log metaInfo
        console.log 'У нас всё загрузилось'
      error: =>
        console.log 'ошибка загрузки=('

  componentWillUnmount: ->
    @messagingService = null

  render: ->
    # if @state.isLoading
    #   content = `<Spinner size={ 15 } />`
    # else if @state.isError
    #   content = `<span className="error-badge">O_o</span>`
    # else
    
    content = `<span className="messages-badge">15</span>`
        
    return `<div className="toolbar__indicator"
                 onClick={ this.handleClick }>
              { content }
            </div>`

  handleClick: ->
    @setState isLoading: true, isError: false

    setTimeout (=>
      @setState {
        isLoading: false
        isError: false
      }
    ), 4000