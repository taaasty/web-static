HeroProfile_SettingsButton = React.createClass

  render: ->
    <button className="profile-settings-button"
            onClick={ this.handleClick }>
      <i className="icon icon--cogwheel" />
    </button>

  handleClick: ->
    TastyEvents.trigger TastyEvents.keys.command_settings_open()

module.exports = HeroProfile_SettingsButton