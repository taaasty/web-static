{ PropTypes } = React

FacebookSuggestionsEmpty = React.createClass
  displayName: 'FacebookSuggestionsEmpty'

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { i18n.t('facebook_suggestions_empty') }
        </div>
      </div>
    </div>

module.exports = FacebookSuggestionsEmpty