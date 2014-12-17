SettingsButton = require '../../buttons/user/settings'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

module.exports = React.createClass
  displayName: 'HeroActions_CurrentUser'

  render: ->
    <div className="hero__actions">
      <button className="follow-button">
        { BUTTON_TITLE }
      </button>
      <SettingsButton />
    </div>