SocialNetworkPanelMixin = require './mixins/socialNetwork'
VkontakteSuggestions    = require './vkontakte/suggestions'
VkontakteSignIn         = require './vkontakte/signIn'

window.PersonsPopup_VkontaktePanel = React.createClass
  displayName: 'PersonsPopup_VkontaktePanel'
  mixins: [SocialNetworkPanelMixin, window.RequesterMixin]

  renderContent: ->
    if @isAuthorized()
      <VkontakteSuggestions
          suggestions={ @state.suggestions }
          suggestionsCount={ @state.suggestionsCount } />
    else
      <VkontakteSignIn />

  isAuthorized: ->
    CurrentUserStore.hasVkontakteAuth()

  loadPanelData: ->
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
        NoticeService.errorResponse data
      complete: =>
        @activateLoadedState()

  getStateFromStore: ->
    suggestions:      RelationshipsStore.getVkontakteSuggestions()
    suggestionsCount: RelationshipsStore.getVkontakteSuggestionsTotalCount()