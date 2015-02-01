{ PropTypes } = React

VkontakteSuggestionsEmpty = React.createClass
  displayName: 'VkontakteSuggestionsEmpty'

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { i18n.t('vkontakte_suggestions_empty') }
        </div>
      </div>
    </div>

module.exports = VkontakteSuggestionsEmpty