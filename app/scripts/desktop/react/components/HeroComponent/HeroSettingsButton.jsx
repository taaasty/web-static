let HeroSettingsButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="hero-settings-button" onClick={this.props.onClick}>
        <i className="icon icon--cogwheel" />
      </button>
    );
  }
});

export default HeroSettingsButton;