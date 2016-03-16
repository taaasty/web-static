/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';
import Tooltip from '../common/Tooltip';
import FollowButton from '../common/RelationButton/FollowButton';
import FlowBrickAvatar from './FlowBrickAvatar';
import { REL_NONE_STATE, REL_GUESSED_STATE } from '../common/RelationButton/constants';

let FlowBrick = React.createClass({
  propTypes: {
    currentUser: PropTypes.object.isRequired,
    flow: PropTypes.object.isRequired,
    relationship: PropTypes.object,
  },

  getInitialState() {
    return {
      relState: this.props.relationship ? this.props.relationship.state : null,
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.relState != nextState.relState;
  },

  handleRelStateChange(relState) {
    this.setState({ relState });
  },

  renderFollowButton() {
    const { currentUser, flow: { id, is_privacy } } = this.props;

    if (this.state.relState &&
        this.state.relState === REL_NONE_STATE ||
        this.state.relState === REL_GUESSED_STATE) {
      return (
        <span onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}>
          <FollowButton
            objectID={currentUser.id}
            onStateChange={this.handleRelStateChange}
            relState={this.state.relState}
            subjectID={id}
            subjectPrivacy={is_privacy}
          />
        </span>
      );
    }
  },

  render() {
    const { flowpic, followers_count, name, title, tlog_url } = this.props.flow;
    const brickClasses = classNames({
      'brick': true,
      'brick--flow': true,
      '__subscribed': this.state.relState === 'friend',
    });

    return (
      <article className={brickClasses}>
        <Link to={uri(tlog_url).path()} >
          <div className="brick__media">
            {this.renderFollowButton()}
            <FlowBrickAvatar flowpic={flowpic} />
          </div>
          <div className="brick__body">
            <h3 className="brick__title">{name}</h3>
            <p className="brick__caption">{title}</p>
            <div className="brick__data">
              <div className="brick__data-item">
                <Tooltip title={i18n.t('flow_brick.followers_count_tooltip')}>
                  <i className="icon icon--friends" />
                  <span>{followers_count}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  },
});

export default FlowBrick;
