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
    currentState: LOADING_STATE
    predictedUsers: []
    selectedUserIndex: 0

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
        predictedUsers = @state.predictedUsers.map (predictedUser, i) ->
          `<MessagesPopup_ChooserResultsItem predictedUser={ predictedUser }
                                             selected={ that.state.selectedUserIndex == i }
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

  selectPreviousResult: -> @_moveHighlight(-1)
  selectNextResult:     -> @_moveHighlight(1)

  loadPredictions: (query) ->
    @createRequest
      url: ApiRoutes.users_predict()
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

  getSelectedUserSlug: ->
    @state.predictedUsers[@state.selectedUserIndex].slug

  _moveHighlight: (delta) ->
    usersCount = @state.predictedUsers.length
    userIndex  = @state.selectedUserIndex

    if usersCount > 0
      if (userIndex > 0 && delta < 0) || (userIndex < usersCount - 1 && delta > 0)
        @setState {
          selectedUserIndex: userIndex + delta
        }