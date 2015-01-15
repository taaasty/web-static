SuggestionListMixin        = require '../../mixins/suggestionList'
FacebookSuggestionsItem    = require './listItem'
FacebookSubscribeAllButton = require './buttons/subscribeAll'

FacebookSuggestionsList = React.createClass
  displayName: 'FacebookSuggestionsList'
  mixins: [SuggestionListMixin]

  listItem:           -> FacebookSuggestionsItem
  subscribeAllButton: -> FacebookSubscribeAllButton

module.exports = FacebookSuggestionsList