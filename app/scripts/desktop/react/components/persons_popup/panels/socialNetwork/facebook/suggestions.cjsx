SuggestionsMixin         = require '../mixins/suggestions'
FacebookSuggestionsList  = require './suggestions/list'
FacebookSuggestionsEmpty = require './suggestions/empty'
{ PropTypes } = React

FacebookSuggestions = React.createClass
  displayName: 'FacebookSuggestions'
  mixins: [SuggestionsMixin]

  listComponent:  -> FacebookSuggestionsList
  emptyComponent: -> FacebookSuggestionsEmpty

module.exports = FacebookSuggestions