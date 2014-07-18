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
    onSelect = (type) -> @props.onSelect(type)

    return `<nav className="tabs-nav tabs-nav--white">
              <ul className="tabs-nav__list">
                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followings" }
                                       count={ this.props.items.followings_count }
                                       title={ FOLLOWINGS }
                                       onClick={ onSelect.bind(this, 'followings') } />

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followers" }
                                       count={ this.props.items.followers_count }
                                       title={ FOLLOWERS }
                                       onClick={ onSelect.bind(this, 'followers') } />

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "guesses" }
                                       count={ this.props.items.guesses_count }
                                       title={ GUESSES }
                                       onClick={ onSelect.bind(this, 'guesses') } />

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "ignores" }
                                       count={ this.props.items.blocked_count }
                                       title={ IGNORES }
                                       onClick={ onSelect.bind(this, 'ignores') } />
              </ul>
            </nav>`

module.exports = PersonsPopup_Menu