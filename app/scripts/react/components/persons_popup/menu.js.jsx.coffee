###* @jsx React.DOM ###

FOLLOWINGS = 'Подписки'
FOLLOWERS  = 'Подписчики'
GUESSES    = 'Заявки'
IGNORES    = 'Блокировка'

# TODO Вынести состояния в константы, а текста в i18n
window.PersonsPopup_Menu = React.createClass

  propTypes:
    items:      React.PropTypes.object.isRequired
    currentTab: React.PropTypes.string.isRequired
    onSelect:   React.PropTypes.func.isRequired

  # TODO Избавиться от совместной передаци type и onClick. Сразу передавать
  # binded onSelect
  render: ->
   `<nav className="tabs-nav tabs-nav--white">
      <ul className="tabs-nav__list">
        <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followings" }
                               count={ this.props.items.followings_count }
                               type="followings"
                               title={ FOLLOWINGS }
                               onClick={ this.props.onSelect } />

        <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followers" }
                               count={ this.props.items.followers_count }
                               type="followers"
                               title={ FOLLOWERS }
                               onClick={ this.props.onSelect } />

        <PersonsPopup_MenuItem isActive={ this.props.currentTab == "guesses" }
                               count={ this.props.items.guesses_count }
                               type="guesses"
                               title={ GUESSES }
                               onClick={ this.props.onSelect } />

        <PersonsPopup_MenuItem isActive={ this.props.currentTab == "ignores" }
                               count={ this.props.items.blocked_count }
                               type="ignores"
                               title={ IGNORES }
                               onClick={ this.props.onSelect } />
      </ul>
    </nav>`

module.exports = PersonsPopup_Menu
