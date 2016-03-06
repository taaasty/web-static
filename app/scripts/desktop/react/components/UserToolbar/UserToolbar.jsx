import React, { createClass, PropTypes } from 'react';
import classnames from 'classnames';
import Scroller from '../common/Scroller';
import UserToolbarToggle from './UserToolbarToggle';
import UserToolbarHoverLine from './UserToolbarHoverLine';
import UserToolbarPrimaryList from './UserToolbarPrimaryList';
import UserToolbarAdditionalList from './UserToolbarAdditionalList';
import UserToolbarGuestList from './UserToolbarGuestList';

const UserToolbar = createClass({
  propTypes: {
    currentUser: PropTypes.object.isRequired,
    hovered: PropTypes.bool.isRequired,
    onDesignSettingsClick: PropTypes.func.isRequired,
    onFriendsClick: PropTypes.func.isRequired,
    onLineHover: PropTypes.func.isRequired,
    onMessagesClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onNotificationsClick: PropTypes.func.isRequired,
    onSearchClick: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired,
    onToggleClick: PropTypes.func.isRequired,
    searchKey: PropTypes.string.isRequired,
    unreadAnonymousCount: PropTypes.number.isRequired,
    unreadBestCount: PropTypes.number.isRequired,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadFriendsCount: PropTypes.number.isRequired,
    unreadLiveCount: PropTypes.number.isRequired,
    unreadLiveFlowCount: PropTypes.number.isRequired,
    unreadNotificationsCount: PropTypes.number.isRequired,
  },

  renderPrimaryList() {
    const { currentUser, hovered, onDesignSettingsClick, onFriendsClick,
            onMessagesClick, onNotificationsClick, unreadAnonymousCount,
            unreadBestCount, unreadConversationsCount, unreadFriendsCount,
            unreadLiveCount, unreadLiveFlowCount, unreadNotificationsCount } = this.props;

    return currentUser.id
      ? <UserToolbarPrimaryList
          currentUser={currentUser}
          onDesignSettingsClick={onDesignSettingsClick}
          onFriendsClick={onFriendsClick}
          onMessagesClick={onMessagesClick}
          onNotificationsClick={onNotificationsClick}
          stayOpen={hovered}
          unreadAnonymousCount={unreadAnonymousCount}
          unreadBestCount={unreadBestCount}
          unreadConversationsCount={unreadConversationsCount}
          unreadFriendsCount={unreadFriendsCount}  
          unreadLiveCount={unreadLiveCount}
          unreadLiveFlowCount={unreadLiveFlowCount}
          unreadNotificationsCount={unreadNotificationsCount}
        />
      : <UserToolbarGuestList
          unreadBestCount={unreadBestCount}
          unreadLiveCount={unreadLiveCount}
        />;
  },

  renderAdditionalList() {
    const { currentUser: { slug }, onSearchClick, onSettingsClick, searchKey } = this.props;

    return (
      <UserToolbarAdditionalList
        onSearchClick={onSearchClick}
        onSettingsClick={onSettingsClick}
        searchKey={searchKey}
        slug={slug}
      />
    );
  },

  render() {
    const { currentUser, onMouseEnter, onMouseLeave, onLineHover,
            unreadConversationsCount, unreadNotificationsCount } = this.props;
    const isLogged = !!currentUser.id;
    const navbarClasses = classnames({
      'toolbar__navbar': true,
      'toolbar__navbar--complex': isLogged,
    });

    return (
      <div
        className="toolbar toolbar--main"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <UserToolbarHoverLine onMouseEnter={onLineHover} />
        <UserToolbarToggle
          hasConversations={!!unreadConversationsCount}
          hasNotifications={!!unreadNotificationsCount}
          onClick={this.props.onToggleClick}
          onMouseEnter={onLineHover}
        />
        <div className={navbarClasses}>
          <Scroller>
            {this.renderPrimaryList()}
          </Scroller>
          {isLogged && this.renderAdditionalList()}
        </div>
      </div>
    );
  },
});

export default UserToolbar;
