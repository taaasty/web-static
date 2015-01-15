SuggestionsMixin          = require '../mixins/suggestions'
VkontakteSuggestionsList  = require './suggestions/list'
VkontakteSuggestionsEmpty = require './suggestions/empty'
{ PropTypes } = React

VkontakteSuggestions = React.createClass
  displayName: 'VkontakteSuggestions'
  mixins: [SuggestionsMixin]

  listComponent:  -> VkontakteSuggestionsList
  emptyComponent: -> VkontakteSuggestionsEmpty

module.exports = VkontakteSuggestions