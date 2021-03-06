HeroTlogActions_SettingsButton = require './buttons/settings'
{ PropTypes } = React

HeroTlogActions_CurrentUser = React.createClass
  displayName: 'HeroTlogActions_CurrentUser'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <div className="hero__actions">
      <button className="follow-button">
        { i18n.t('buttons.hero_current_user') }
      </button>
      <HeroTlogActions_SettingsButton slug={ @props.user.slug } />
    </div>

module.exports = HeroTlogActions_CurrentUser