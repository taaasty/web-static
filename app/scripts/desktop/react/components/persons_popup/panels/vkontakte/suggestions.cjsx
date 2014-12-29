VkontakteSuggestionsList  = require './suggestions/list'
VkontakteSuggestionsEmpty = require './suggestions/empty'
{ PropTypes } = React

VkontakteSuggestions = React.createClass
  displayName: 'VkontakteSuggestions'

  propTypes:
    suggestions:      PropTypes.array
    suggestionsCount: PropTypes.number

  render: ->
    if @hasSuggestions()
      <VkontakteSuggestionsList
          suggestions={ @props.suggestions }
          suggestionsCount={ @props.suggestionsCount } />
    else
      <VkontakteSuggestionsEmpty />

  hasSuggestions: ->
    @props.suggestionsCount > 0

module.exports = VkontakteSuggestions