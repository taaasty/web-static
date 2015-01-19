{ PropTypes } = React

HeroTlogActions_SettingsButton = React.createClass
  displayName: 'HeroTlogActions_SettingsButton'

  propTypes:
    slug: PropTypes.string.isRequired

  render: ->
    <button className="profile-settings-button"
            onClick={ @handleClick }>
      <i className="icon icon--cogwheel" />
    </button>

  handleClick: ->
    window.location = Routes.userSettings @props.slug

module.exports = HeroTlogActions_SettingsButton