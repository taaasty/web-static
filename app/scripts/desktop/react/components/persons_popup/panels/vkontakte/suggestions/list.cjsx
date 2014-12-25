VkontakteSuggestionsItem = require '../../../items/vkontakte_suggestion'
{ PropTypes } = React

#TODO: i18n
SUBSCRIBE_ALL_BUTTON_TEXT = 'Подписаться на всех'

VkontakteSuggestionsList = React.createClass
  displayName: 'VkontakteSuggestionsList'
  mixins: [ReactGrammarMixin]

  propTypes:
    suggestions:      PropTypes.array.isRequired
    suggestionsCount: PropTypes.number.isRequired

  render: ->
    # <div className="persons-headline__right">
    #   <button className="manage-persons-button">
    #     { SUBSCRIBE_ALL_BUTTON_TEXT }
    #   </button>
    # </div>
    <div>
      <div className="persons-headline">
        <div className="persons-headline__left">
          { @getSuggestionsCountMessage() }
        </div>
      </div>
      <ul className="persons">
        { @renderSuggestionsList() }
      </ul>
    </div>

  renderSuggestionsList: ->
    @props.suggestions.map (suggestion) =>
      <VkontakteSuggestionsItem
          suggestion={ suggestion }
          key={ suggestion.user.id } />

  getSuggestionsCountMessage: ->
    'Мы нашли ' + @props.suggestionsCount + ' ' + @declension(@props.suggestionsCount, ['друга', 'друга', 'друзей'])

module.exports = VkontakteSuggestionsList