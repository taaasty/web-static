{ PropTypes } = React

HeroActions_SettingsButton = React.createClass
  displayName: 'HeroActions_SettingsButton'

  propTypes:
    slug: PropTypes.string.isRequired

  render: ->
    <button className="profile-settings-button"
            onClick={ @handleClick }>
      <i className="icon icon--cogwheel" />
    </button>

  handleClick: ->
    window.location = Routes.userSettings @props.slug

module.exports = HeroActions_SettingsButton