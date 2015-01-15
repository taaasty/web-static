SuggestionListMixin         = require '../../mixins/suggestionList'
VkontakteSuggestionsItem    = require './listItem'
VkontakteSubscribeAllButton = require './buttons/subscribeAll'

VkontakteSuggestionsList = React.createClass
  displayName: 'VkontakteSuggestionsList'
  mixins: [SuggestionListMixin]

  listItem:           -> VkontakteSuggestionsItem
  subscribeAllButton: -> VkontakteSubscribeAllButton

module.exports = VkontakteSuggestionsList