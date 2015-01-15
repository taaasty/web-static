SocialNetworkPanelMixin = require './mixins/socialNetwork'
FacebookSuggestions     = require './facebook/suggestions'
FacebookSignIn          = require './facebook/signIn'

window.PersonsPopup_FacebookPanel = React.createClass
  displayName: 'PersonsPopup_FacebookPanel'
  mixins: [SocialNetworkPanelMixin, window.RequesterMixin]

  renderContent: ->
    if @isAuthorized()
      <FacebookSuggestions
          suggestions={ @state.suggestions }
          suggestionsCount={ @state.suggestionsCount } />
    else
      <FacebookSignIn />

  isAuthorized: ->
    CurrentUserStore.hasFacebookAuth()

  loadPanelData: ->
    @activateLoadingState()

    @createRequest
      url: ApiRoutes.suggestions_facebook()
      success: (suggestions) =>
        RelationshipsDispatcher.handleServerAction
          type: 'suggestionsLoaded'
          source: 'facebook'
          suggestions: suggestions
      error: (data) =>
        @activateErrorState()
        TastyNotifyController.errorResponse data
      complete: =>
        @activateLoadedState()

  getStateFromStore: ->
    suggestions:      RelationshipsStore.getFacebookSuggestions()
    suggestionsCount: RelationshipsStore.getFacebookSuggestionsTotalCount()