###* @jsx React.DOM ###

FOLLOWINGS = 'Подписки'
FOLLOWERS  = 'Подписчики'
GUESSES    = 'Заявки'
IGNIRED    = 'Блокировка'

window.PersonsPopup_Menu = PersonsPopup_Menu = React.createClass

  propTypes:
    # TODO конкретно передавайть каждый item:
    # followingsCount и тп
    items:      React.PropTypes.object.isRequired
    currentTab: React.PropTypes.string.isRequired

  render: ->
   `<nav className="tabs-nav tabs-nav--white">
      <ul className="tabs-nav__list">
        <PersonsPopup_MenuItem active={ this.props.currentTab == "followings" }
                               count={ this.props.items.followings_count }
                               type="followings"
                               title={ FOLLOWINGS }
                               onClick={ this.props.onClick } />
        <PersonsPopup_MenuItem active={ this.props.currentTab == "followers" }
                               count={ this.props.items.followers_count }
                               type="followers"
                               title={ FOLLOWERS }
                               onClick={ this.props.onClick } />
        <PersonsPopup_MenuItem active={ this.props.currentTab == "guesses" }
                               count={ this.props.items.guesses_count }
                               type="guesses"
                               title={ GUESSES }
                               onClick={ this.props.onClick } />
      </ul>
    </nav>`

module.exports = PersonsPopup_Menu
