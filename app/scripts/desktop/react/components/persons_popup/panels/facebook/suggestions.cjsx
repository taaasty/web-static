FacebookSuggestionsList  = require './suggestions/list'
FacebookSuggestionsEmpty = require './suggestions/empty'
{ PropTypes } = React

FacebookSuggestions = React.createClass
  displayName: 'FacebookSuggestions'

  propTypes:
    suggestions:      PropTypes.array
    suggestionsCount: PropTypes.number

  render: ->
    if @hasSuggestions()
      <FacebookSuggestionsList
          suggestions={ @props.suggestions }
          suggestionsCount={ @props.suggestionsCount } />
    else
      <FacebookSuggestionsEmpty />

  hasSuggestions: ->
    @props.suggestionsCount > 0

module.exports = FacebookSuggestions