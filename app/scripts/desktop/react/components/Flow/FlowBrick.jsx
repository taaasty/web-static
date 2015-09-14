import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Tooltip from '../common/Tooltip';
import FollowButton from '../common/RelationButton/FollowButton';
import FlowBrickAvatar from './FlowBrickAvatar';

import { REL_NONE_STATE, REL_GUESSED_STATE } from '../common/RelationButton/constants';

let FlowBrick = React.createClass({
  propTypes: {
    flow: PropTypes.object.isRequired,
    relationship: PropTypes.object,
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
        <a href="#" onTouchTap={this.onTouchTap}>
          <div className="brick__media">
            {this.renderFollowButton()}
            <FlowBrickAvatar flowpic={this.props.flow.flowpic} />
          </div>
          <div className="brick__body">
            <h3 className="brick__title">{this.props.flow.name}</h3>
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
        </a>
      </article>
    );
  },

  renderFollowButton() {
    if (this.state.relState &&
        this.state.relState === REL_NONE_STATE ||
        this.state.relState === REL_GUESSED_STATE) {
      return (
        <FollowButton
          objectID={CurrentUserStore.getUserID()}
          onStateChange={this.handleRelStateChange}
          relState={this.state.relState}
          subjectID={this.props.flow.id}
          subjectPrivacy={this.props.flow.is_privacy}
        />
      );
    }
  },

  handleRelStateChange(relState) {
    this.setState({relState});
  },

  onTouchTap(ev) {
    ev.preventDefault();
    window.location.href = this.props.flow.tlog_url;
  },
});

export default FlowBrick;
