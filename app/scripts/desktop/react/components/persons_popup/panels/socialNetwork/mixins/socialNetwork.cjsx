ConnectStoreMixin = require '../../../../../../../shared/react/mixins/connectStore'

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
      when ERROR_STATE   then @renderMessage i18n.t('persons_popup_error')
      when LOADING_STATE then @renderMessage i18n.t('persons_popup_loading')
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