let HeroProfile_SettingsButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="profile-settings-button" onClick={this.handleClick}>
        <i className="icon icon--cogwheel" />
      </button>
    );
  },

  handleClick() {
    this.props.onClick();
  }
});

export default HeroProfile_SettingsButton;