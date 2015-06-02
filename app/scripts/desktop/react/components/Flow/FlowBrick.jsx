import FollowButton from '../common/FollowButton';
import FlowBrickAvatar from './FlowBrickAvatar';

let FlowBrick = React.createClass({
  propTypes: {
    flow: React.PropTypes.object.isRequired,
    relationship: React.PropTypes.object.isRequired
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <article className="brick brick--flow">
        <div className="brick__media">
          <FollowButton relState={this.props.relationship.state} tlog={this.props.flow} />
          <FlowBrickAvatar flowpic={this.props.flow.flowpic} />
        </div>
        <div className="brick__body">
          <h3 className="brick__title">{this.props.flow.name}</h3>
          <p className="brick__caption">{this.props.flow.title}</p>
          <div className="brick__data">
            <div className="brick__data-item">
              <i className="icon icon--friends"></i>
              <span>{this.props.flow.followers_count}</span>
            </div><div className="brick__data-item">
              <i className="icon icon--text-circle"></i>
              <span>{this.props.flow.entries_count}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }
});

export default FlowBrick;