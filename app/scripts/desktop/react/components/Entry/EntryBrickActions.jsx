let EntryBrickActions = React.createClass({
  propTypes: {
    hasModeration: React.PropTypes.bool.isRequired,
    onAccept: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired
  },

  render() {
    if (this.props.hasModeration) {
      return (
        <div className="brick__actions">
          <div className="moderator-actions">
            <div className="moderator-action moderator-action--accept"
                 onClick={this.props.onAccept}>
              <i className="icon icon--tick" />
            </div>
            <div className="moderator-action moderator-action--reject"
                 onClick={this.props.onDecline}>
              <i className="icon icon--cross" />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
});

export default EntryBrickActions;