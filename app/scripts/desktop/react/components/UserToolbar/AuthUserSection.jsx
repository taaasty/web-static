import React, { Component, PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import NotificationsPopover from './NotificationsPopover';
import UserPopover from './UserPopover';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

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
    const { currentUser: { userpic }, hideNotificationsPopover, isNotificationsPopoverVisible,
            isUserPopoverVisible, onMessagesClick, onNotificationsClick, onUserClick,
            unreadConversationsCount, unreadNotificationsCount } = this.props;

    return (
      <ul className="toolbar__user-list">
        <li className="toolbar__user-list-item" onClick={onNotificationsClick}>
          <div className="toolbar__icon-wrapper">
            <i className="icon icon--bell" />
            {this.renderBadge(unreadNotificationsCount, 'notifications-badge')}
          </div>
          <ReactCSSTransitionGroup transitionName="toolbar__popover">
            {isNotificationsPopoverVisible ? <NotificationsPopover hide={hideNotificationsPopover} /> : null}
          </ReactCSSTransitionGroup>
        </li>
        <li className="toolbar__user-list-item" onClick={onMessagesClick}>
          <div className="toolbar__icon-wrapper">
            <i className="icon icon--messages" />
            {this.renderBadge(unreadConversationsCount, 'messages-badge')}
          </div>
        </li>
        <li className="toolbar__user-list-item" onClick={onUserClick}>
          <span className="toolbar__user-avatar">
            <Avatar size={38} userpic={userpic} />
          </span>
          <span className="toolbar__user-avatar-down">
            <i className="icon icon--corner-down-bold" />
          </span>
          <ReactCSSTransitionGroup transitionName="toolbar__popover">
            {isUserPopoverVisible ? <UserPopover {...this.props} /> : null}
          </ReactCSSTransitionGroup>
        </li>
      </ul>
    );
  }
}

AuthUserSection.propTypes = {
  currentUser: PropTypes.object.isRequired,
  hideNotificationsPopover: PropTypes.func.isRequired,
  hideUserPopover: PropTypes.func.isRequired,
  isNotificationsPopoverVisible: PropTypes.bool.isRequired,
  isUserPopoverVisible: PropTypes.bool.isRequired,
  onDesignSettingsClick: PropTypes.func.isRequired,
  onFriendsClick: PropTypes.func.isRequired,
  onMessagesClick: PropTypes.func.isRequired,
  onNotificationsClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onUserClick: PropTypes.func.isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default AuthUserSection;
