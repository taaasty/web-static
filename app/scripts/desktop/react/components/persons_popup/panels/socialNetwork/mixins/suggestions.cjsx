{ PropTypes } = React

SuggestionsMixin =

  propTypes:
    suggestions:      PropTypes.array
    suggestionsCount: PropTypes.number

  render: ->
    ListComponent  = @listComponent()
    EmptyComponent = @emptyComponent()

    if @hasSuggestions()
      <ListComponent
          suggestions={ @props.suggestions }
          suggestionsCount={ @props.suggestionsCount } />
    else
      <EmptyComponent />

  hasSuggestions: ->
    @props.suggestionsCount > 0

module.exports = SuggestionsMixin