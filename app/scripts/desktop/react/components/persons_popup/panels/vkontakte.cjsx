VkontakteSuggestions = require './vkontakte/suggestions'
VkontakteSignIn      = require './vkontakte/sign_in'

#TODO: i18n
LOADING_ERROR = 'Ошибка загрузки.'
LOADING       = 'Загружаю..'
EMPTY_LIST    = 'Список пуст.'

ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'
LOADING_STATE = 'loading'

window.PersonsPopup_VkontaktePanel = React.createClass
  displayName: 'PersonsPopup_VkontaktePanel'
  mixins: [window.RequesterMixin, 'ReactActivitiesUser', ComponentManipulationsMixin]

  getInitialState: ->
    currentState:     LOADED_STATE
    suggestions:      null
    suggestionsCount: null

  componentWillMount: ->
    @loadPanelData() if @isAuthorized()

  componentDidMount: ->
    RelationshipsStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    RelationshipsStore.removeChangeListener @onStoreChange

  render: ->
    content = switch @state.currentState
      when ERROR_STATE   then @renderMessage LOADING_ERROR
      when LOADING_STATE then @renderMessage LOADING
      when LOADED_STATE  then @renderContent()
      else console.warn? 'Unknown state of PersonsPopup_VkontaktePanel component', @state.currentState

    <div className="tabs-panel">
      { content }
    </div>

  renderContent: ->
    if @isAuthorized()
      <VkontakteSuggestions
          suggestions={ @state.suggestions }
          suggestionsCount={ @state.suggestionsCount } />
    else
      <VkontakteSignIn />

  renderMessage: (message) ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { message }
        </div>
      </div>
    </div>

  isAuthorized: ->
    CurrentUserStore.hasVkontakteAuth()

  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateLoadedState:  -> @safeUpdateState(currentState: LOADED_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

  loadPanelData: ->
    @safeUpdate => @incrementActivities()
    @activateLoadingState()

    @createRequest
      url: ApiRoutes.suggestions_vkontakte()
      success: (suggestions) =>
        RelationshipsDispatcher.handleServerAction
          type: 'suggestionsLoaded'
          source: 'vkontakte'
          suggestions: suggestions
      error: (data) =>
        @activateErrorState()
        TastyNotifyController.errorResponse data
      complete: =>
        @activateLoadedState()
        @safeUpdate => @decrementActivities()

  getStateFromStore: ->
    suggestions:      RelationshipsStore.getVkontakteSuggestions()
    suggestionsCount: RelationshipsStore.getVkontakteSuggestionsTotalCount()

  onStoreChange: ->
    @setState @getStateFromStore()