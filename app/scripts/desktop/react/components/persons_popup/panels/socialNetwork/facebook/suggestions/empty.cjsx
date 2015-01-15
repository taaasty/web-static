{ PropTypes } = React

#TODO: i18n
MESSAGE = 'К сожалению, на Тейсти нет ваших друзей из Facebook на которых вы не подписаны'

FacebookSuggestionsEmpty = React.createClass
  displayName: 'FacebookSuggestionsEmpty'

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { MESSAGE }
        </div>
      </div>
    </div>

module.exports = FacebookSuggestionsEmpty