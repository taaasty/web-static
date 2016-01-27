import React, { createClass, PropTypes } from 'react';
import classnames from 'classnames';
import Scroller from '../common/scroller/scroller';
import UserToolbarToggle from './UserToolbarToggle';
import UserToolbarHoverLine from './UserToolbarHoverLine';
import UserToolbarPrimaryList from './UserToolbarPrimaryList';
import UserToolbarAdditionalList from './UserToolbarAdditionalList';
import UserToolbarGuestList from './UserToolbarGuestList';

const UserToolbar = createClass({
  propTypes: {
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
    searchTitleI18nKey: PropTypes.string.isRequired,
    searchUrl: PropTypes.string.isRequired,
    unreadAnonymousCount: PropTypes.number.isRequired,
    unreadBestCount: PropTypes.number.isRequired,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadFriendsCount: PropTypes.number.isRequired,
    unreadLiveCount: PropTypes.number.isRequired,
    unreadLiveFlowCount: PropTypes.number.isRequired,
    unreadNotificationsCount: PropTypes.number.isRequired,
    user: PropTypes.object,
    userLogged: PropTypes.bool.isRequired,
  },

  renderPrimaryList() {
    return this.props.userLogged
      ? <UserToolbarPrimaryList
          onDesignSettingsClick={this.props.onDesignSettingsClick}
          onFriendsClick={this.props.onFriendsClick}
          onMessagesClick={this.props.onMessagesClick}
          onNotificationsClick={this.props.onNotificationsClick}
          stayOpen={this.props.hovered}
          unreadAnonymousCount={this.props.unreadAnonymousCount}
          unreadBestCount={this.props.unreadBestCount}
          unreadConversationsCount={this.props.unreadConversationsCount}
          unreadFriendsCount={this.props.unreadFriendsCount}  
          unreadLiveCount={this.props.unreadLiveCount}
          unreadLiveFlowCount={this.props.unreadLiveFlowCount}
          unreadNotificationsCount={this.props.unreadNotificationsCount}
          user={this.props.user}
        />
      : <UserToolbarGuestList
          unreadBestCount={this.props.unreadBestCount}
          unreadLiveCount={this.props.unreadLiveCount}
        />;
  },

  renderAdditionalList() {
    return (
      <UserToolbarAdditionalList
        onSearchClick={this.props.onSearchClick}
        onSettingsClick={this.props.onSettingsClick}
        searchTitleI18nKey={this.props.searchTitleI18nKey}
        user={this.props.user}
      />
    );
  },

  render() {
    const navbarClasses = classnames({
      'toolbar__navbar': true,
      'toolbar__navbar--complex': this.props.userLogged,
    });

    return (
      <div
        className="toolbar toolbar--main"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <UserToolbarHoverLine onMouseEnter={this.props.onLineHover} />
        <UserToolbarToggle
          hasConversations={!!this.props.unreadConversationsCount}
          hasNotifications={!!this.props.unreadNotificationsCount}
          onClick={this.props.onToggleClick}
          onMouseEnter={this.props.onLineHover}
        />
        <div className={navbarClasses}>
          <Scroller>
            {this.renderPrimaryList()}
          </Scroller>
          {this.props.userLogged && this.renderAdditionalList()}
        </div>
      </div>
    );
  },
});

export default UserToolbar;
