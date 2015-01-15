ConnectStoreMixin = require '../../../../../../../shared/react/mixins/connectStore'

#TODO: i18n
LOADING_ERROR = 'Ошибка загрузки.'
LOADING       = 'Загружаю..'
EMPTY_LIST    = 'Список пуст.'

ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'
LOADING_STATE = 'loading'

SocialNetworkPanelMixin =
  mixins: [ConnectStoreMixin(RelationshipsStore), ComponentManipulationsMixin]

  getInitialState: ->
    currentState: LOADED_STATE

  componentWillMount: ->
    @loadPanelData() if @isAuthorized()

  render: ->
    content = switch @state.currentState
      when ERROR_STATE   then @renderMessage LOADING_ERROR
      when LOADING_STATE then @renderMessage LOADING
      when LOADED_STATE  then @renderContent()
      else console.warn? "Unknown state of #{ @_currentElement.type.displayName } component", @state.currentState

    <div className="tabs-panel">
      { content }
    </div>

  renderMessage: (message) ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { message }
        </div>
      </div>
    </div>

  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateLoadedState:  -> @safeUpdateState(currentState: LOADED_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

module.exports = SocialNetworkPanelMixin