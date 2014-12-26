HeroActions_SettingsButton = require './buttons/settings'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

HeroActions_CurrentUser = React.createClass
  displayName: 'HeroActions_CurrentUser'

  render: ->
    <div className="hero__actions">
      <button className="follow-button">
        { BUTTON_TITLE }
      </button>
      <HeroActions_SettingsButton />
    </div>

module.exports = HeroActions_CurrentUser