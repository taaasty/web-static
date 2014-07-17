###* @jsx React.DOM ###

FOLLOWINGS = 'Подписки'
FOLLOWERS  = 'Подписчики'
GUESSES    = 'Заявки'
BLOCKED    = 'Блокировка'

window.PersonsPopup_Menu = PersonsPopup_Menu = React.createClass

  propTypes:
    items:    React.PropTypes.object
    tabName: React.PropTypes.string.isRequired

  render: ->
   `<nav className="tabs-nav tabs-nav--white">
      <ul className="tabs-nav__list">
        <PersonsPopup_MenuItem active={ this.props.tabName == "followings" }
                               count={ this.props.items.followings_count }
                               type="followings"
                               title={ FOLLOWINGS }
                               onClick={ this.props.onClick }></PersonsPopup_MenuItem>
        <PersonsPopup_MenuItem active={ this.props.tabName == "followers" }
                               count={ this.props.items.followers_count }
                               type="followers"
                               title={ FOLLOWERS }
                               onClick={ this.props.onClick }></PersonsPopup_MenuItem>
        <PersonsPopup_MenuItem active={ this.props.tabName == "guesses" }
                               count={ this.props.items.guesses_count }
                               type="guesses"
                               title={ GUESSES }
                               onClick={ this.props.onClick }></PersonsPopup_MenuItem>
      </ul>
    </nav>`

module.exports = PersonsPopup_Menu