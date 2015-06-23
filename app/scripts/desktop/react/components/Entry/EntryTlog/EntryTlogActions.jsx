import React, { PropTypes } from 'react';

export default class EntryTlogActions {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="post__actions">
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
  }
}