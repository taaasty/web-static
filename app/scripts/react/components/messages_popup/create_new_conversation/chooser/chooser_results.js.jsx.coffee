###* @jsx React.DOM ###

LOADING_STATE = 'loadingState'
LOADED_STATE  = 'loadedState'
EMPTY_STATE   = 'emptyState'

window.MessagesPopup_ChooserResults = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    query:    React.PropTypes.string.isRequired
    onSubmit: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState:   LOADING_STATE
    predictedUsers: []

  componentDidMount: -> @loadPredictions(@props.query)

  componentWillReceiveProps: (nextProps) ->
    if @props.query isnt nextProps.query
      @loadPredictions nextProps.query

  render: ->
    switch @state.currentState
      when LOADING_STATE
        content = `<div className="messages__chooser-loading">
                     <Spinner size={ 31 } />
                   </div>`

      when LOADED_STATE
        that = @
        predictedUsers = @state.predictedUsers.map (predictedUser) ->
          `<MessagesPopup_ChooserResultsItem predictedUser={ predictedUser }
                                             onClick={ that.props.onSubmit }
                                             key={ predictedUser.id } />`

        content = `<div>{ predictedUsers }</div>`

      when EMPTY_STATE
        content = `<div className="messages__chooser-empty">
                     К сожалению, мы не можем найти данного пользователя
                   </div>`

    return `<div className="messages__chooser-results">
              { content }
            </div>`

  activateEmptyState:  -> @setState currentState: EMPTY_STATE
  activateLoadedState: -> @setState currentState: LOADED_STATE

  loadPredictions: (query) ->
    @createRequest
      url: Routes.api.users_predict()
      method: 'GET'
      data:
        query: query
      success: (predictedUsers) =>
        @setState { predictedUsers }

        if predictedUsers.length == 0
          @activateEmptyState()
        else
          @activateLoadedState()
      error: (errMsg) =>
        TastyNotifyController.errorResponse errMsg