let HeroSubscriptionsButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="hero-subscriptions-button" onClick={this.props.onClick}>
        <i className="icon icon--friends" />
      </button>
    );
  }
});

export default HeroSubscriptionsButton;