/*global i18n */
import React, { Component, PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';

const MAX_BADGE_COUNT = 99;
const MAX_BADGE_PRESENTATION = `${MAX_BADGE_COUNT}+`;

class AuthUserSection extends Component {
  renderBadge(count, className) {
    return !!count && (
      <span className={className}>
        {count > MAX_BADGE_COUNT ? MAX_BADGE_PRESENTATION : count}
      </span>
    );
  }
  render() {
    const { currentUser: { userpic }, onMessagesClick, onNotificationsClick,
            unreadConversationsCount, unreadNotificationsCount } = this.props;

    return (
      <ul className="toolbar__user-list">
        <li className="toolbar__user-list-item" onClick={onMessagesClick}>
          <i className="icon icon--messages" />
          {this.renderBadge(unreadConversationsCount || 2, 'messages-badge')}
        </li>
        <li className="toolbar__user-list-item" onClick={onNotificationsClick}>
          <i className="icon icon--bell" />
          {this.renderBadge(unreadNotificationsCount || 111, 'notifications-badge')}
        </li>
        <li className="toolbar__user-list-item">
          <span className="toolbar__user-avatar">
            <Avatar size={38} userpic={userpic} />
          </span>
          <span className="toolbar__user-avatar-down">
            <i className="icon icon--corner-down-bold" />
          </span>
        </li>
      </ul>
    );
  }
}

AuthUserSection.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onMessagesClick: PropTypes.func.isRequired,
  onNotificationsClick: PropTypes.func.isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default AuthUserSection;
