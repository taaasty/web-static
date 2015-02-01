{ PropTypes } = React

SuggestionListMixin =
  mixins: [ReactGrammarMixin, ScrollerMixin]

  propTypes:
    suggestions:      PropTypes.array.isRequired
    suggestionsCount: PropTypes.number.isRequired

  render: ->
    <div className="scroller scroller--persons" ref="scroller">
      <div className="scroller__pane js-scroller-pane">
        <div className="persons-headline">
          { @renderSubscribeAllButton() }
          <div className="persons-headline__left">
            { @getSuggestionsCountMessage() }
          </div>
        </div>
        <ul className="persons">
          { @renderSuggestionsList() }
        </ul>
      </div>
      <div className="scroller__track js-scroller-track">
        <div className="scroller__bar js-scroller-bar" />
      </div>
    </div>

  renderSuggestionsList: ->
    ListItem = @listItem()

    @props.suggestions.map (suggestion) =>
      <ListItem
          suggestion={ suggestion }
          key={ suggestion.user.id } />

  renderSubscribeAllButton: ->
    SubscribeAllButton = @subscribeAllButton()

    if @props.suggestions.length > 1
      <div className="persons-headline__right">
        <SubscribeAllButton />
      </div>

  getSuggestionsCountMessage: ->
    i18n.t 'suggestions_found', count: @props.suggestionsCount

module.exports = SuggestionListMixin