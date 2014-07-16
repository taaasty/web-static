###* @jsx React.DOM ###

FOLLOWINGS = 'Подписки'
FOLLOWERS  = 'Подписчики'
GUESSES    = 'Заявки'
BLOCKED    = 'Блокировка'

window.PersonsPopupTabs = PersonsPopupTabs = React.createClass

  propTypes:
    tabs:    React.PropTypes.object
    tabName: React.PropTypes.string.isRequired

  render: ->
   `<nav className="tabs-nav tabs-nav--white">
      <ul className="tabs-nav__list">
        <PersonsPopupTab active={ this.props.tabName == "followings" }
                         count={ this.props.tabs.followings_count }
                         type="followings"
                         title={ FOLLOWINGS }
                         onClick={ this.props.onClick }></PersonsPopupTab>
        <PersonsPopupTab active={ this.props.tabName == "followers" }
                         count={ this.props.tabs.followers_count }
                         type="followers"
                         title={ FOLLOWERS }
                         onClick={ this.props.onClick }></PersonsPopupTab>
        <PersonsPopupTab active={ this.props.tabName == "guesses" }
                         count={ this.props.tabs.guesses_count }
                         type="guesses"
                         title={ GUESSES }
                         onClick={ this.props.onClick }></PersonsPopupTab>
      </ul>
    </nav>`

module.exports = PersonsPopupTabs