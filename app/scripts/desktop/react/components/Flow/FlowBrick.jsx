import classnames from 'classnames';
import Tooltip from '../common/Tooltip';
import FollowButton from '../common/FollowButton';
import FlowBrickAvatar from './FlowBrickAvatar';

let FlowBrick = React.createClass({
  propTypes: {
    flow: React.PropTypes.object.isRequired,
    relationship: React.PropTypes.object
  },

  getInitialState() {
    return {
      relState: this.props.relationship ? this.props.relationship.state : null
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.relState != nextState.relState;
  },

  render() {
    let brickClasses = classnames('brick', 'brick--flow', {
      '__subscribed': this.state.relState === 'friend'
    });

    return (
      <article className={brickClasses}>
        <div className="brick__media">
          {this.renderFollowButton()}
          <FlowBrickAvatar flowpic={this.props.flow.flowpic} />
        </div>
        <div className="brick__body">
          <a href={this.props.flow.tlog_url} className="brick__link">
            <h3 className="brick__title">{this.props.flow.name}</h3>
          </a>
          <p className="brick__caption">{this.props.flow.title}</p>
          <div className="brick__data">
            <div className="brick__data-item">
              <Tooltip title={i18n.t('flow_brick.followers_count_tooltip')}>
                <i className="icon icon--friends" />
                <span>{this.props.flow.followers_count}</span>
              </Tooltip>
            </div>
            <div className="brick__data-item">
              <Tooltip title={i18n.t('flow_brick.entries_count_tooltip')}>
                <i className="icon icon--text-circle" />
                <span>{this.props.flow.public_tlog_entries_count}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </article>
    );
  },

  renderFollowButton() {
    if (this.state.relState) {
      return (
        <FollowButton
            tlog={this.props.flow}
            relState={this.state.relState}
            onChange={this.handleRelStateChange} />
      );
    }
  },

  handleRelStateChange(relState) {
    this.setState({relState});
  }
});

export default FlowBrick;