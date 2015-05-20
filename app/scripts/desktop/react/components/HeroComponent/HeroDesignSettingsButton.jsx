let HeroDesignSettingsButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="hero-design-settings-button" onClick={this.props.onClick}>
        <i className="icon icon--drawing" />
      </button>
    );
  }
});

export default HeroDesignSettingsButton;