{ PropTypes } = React

#TODO: i18n
MESSAGE = 'К сожалению, на Тейсти нет ваших друзей из Вконтакте на которых вы не подписаны'

VkontakteSuggestionsEmpty = React.createClass
  displayName: 'VkontakteSuggestionsEmpty'

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          { MESSAGE }
        </div>
      </div>
    </div>

module.exports = VkontakteSuggestionsEmpty