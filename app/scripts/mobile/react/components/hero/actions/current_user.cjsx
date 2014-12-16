SettingsButton = require '../../buttons/user/settings'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

HeroActions_CurrentUser = React.createClass

  render: ->
    <div className="hero__actions">
      <button className="follow-button">
        { BUTTON_TITLE }
      </button>
      <SettingsButton />
    </div>

module.exports = HeroActions_CurrentUser