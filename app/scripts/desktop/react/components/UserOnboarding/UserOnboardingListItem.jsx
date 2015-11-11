/*global FollowButton */
import React, { PropTypes } from 'react';

class UserOnboardingListItem {
  render() {
    const { user } = this.props.relationship;

    return (
      <li className="person">
        <div className="person__in">
          <div className="person__avatar">
            <a href={user.tlog_url}>
              <UserAvatar size={48} user={user} />
            </a>
          </div>
          <div className="person__desc">
            <a href={user.tlog_url}>
              <p className="person__name">
                {user.name}
              </p>
            </a>
            <div className="person__count">
              {user.title}
            </div>
          </div>
          <div className="person__actions">
            <FollowButton relationship={this.props.relationship} />
          </div>
        </div>
      </li>
    );
  }
}
