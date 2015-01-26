i18n                           = require 'i18next'
HeroTlogActions_SettingsButton = require './buttons/settings'
{ PropTypes } = React

BUTTON_TITLE = -> i18n.t 'current_user_button'

HeroTlogActions_CurrentUser = React.createClass
  displayName: 'HeroTlogActions_CurrentUser'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <div className="hero__actions">
      <button className="follow-button">
        { BUTTON_TITLE() }
      </button>
      <HeroTlogActions_SettingsButton slug={ @props.user.slug } />
    </div>

module.exports = HeroTlogActions_CurrentUser