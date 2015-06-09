import RelationshipActionCreators from '../../actions/Relationship';

let UnfollowButton = React.createClass({
  propTypes: {
    objectID: React.PropTypes.number.isRequired,
    subjectID: React.PropTypes.number
  },

  render() {
    return (
      <button
          className="button button--small button--outline-light-white button--icon"
          onTouchTap={this.handleClick}>
        <i className="icon icon--cross" />
      </button>
    );
  },

  handleClick() {
    let { objectID, subjectID } = this.props;
    RelationshipActionCreators.unfollowFromYourself(objectID, subjectID);
  }
});

export default UnfollowButton;