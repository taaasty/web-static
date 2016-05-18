/*global i18n */
import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';
import classnames from 'classnames';
import UserToolbarPrimaryList from './UserToolbarPrimaryList';
import UserToolbarAdditionalList from './UserToolbarAdditionalList';
import UserToolbarGuestList from './UserToolbarGuestList';

class UserToolbar extends Component {
  renderPrimaryList() {
    const { currentUser, onDesignSettingsClick, onFriendsClick, onMessagesClick,
            onNotificationsClick, unreadFriendsCount, unreadNotificationsCount } = this.props;

    return currentUser.id
      ? <UserToolbarPrimaryList
          currentUser={currentUser}
          onDesignSettingsClick={onDesignSettingsClick}
          onFriendsClick={onFriendsClick}
          onMessagesClick={onMessagesClick}
          onNotificationsClick={onNotificationsClick}
          unreadFriendsCount={unreadFriendsCount}  
          unreadNotificationsCount={unreadNotificationsCount}
        />
      : <UserToolbarGuestList
          unreadBestCount={unreadBestCount}
          unreadLiveCount={unreadLiveCount}
        />;
  }
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
  }
  renderCounter(count) {
    return count > 0
      ? ` (+${count})`
      : '';
  }
  render() {
    const { currentUser, unreadFriendsCount } = this.props;
    const isLogged = !!currentUser.id;

    return (
      <div className="toolbar toolbar--main">
        <ul className="toolbar--main__links">
          <li className="toolbar--main__link-item --icon-ribbon">
            <i className="icon icon--ribbon" />
          </li>
          <Link to={uri(Routes.live_feed_path()).path()}>
            <li className="toolbar--main__link-item">
              {i18n.t('toolbar.live')}
            </li>
          </Link>
          <Link to={uri(Routes.flows_path()).path()}>
            <li className="toolbar--main__link-item">
              {i18n.t('toolbar.flows')}
            </li>
          </Link>
          <Link to={uri(Routes.people_path()).path()}>
            <li className="toolbar--main__link-item">
              {i18n.t('toolbar.people')}
            </li>
          </Link>
          <Link to={uri(Routes.anonymous_feed_path()).path()}>
            <li className="toolbar--main__link-item">
              {i18n.t('toolbar.anonymous')}
            </li>
          </Link>
          <Link to={uri(Routes.friends_feed_path()).path()}>
            <li className="toolbar--main__link-item">
              {i18n.t('toolbar.friends')}
              {this.renderCounter(unreadFriendsCount)}
            </li>
          </Link>
        </ul>
        {false && <SearchField />}
        {false && isLogged && this.renderAdditionalList()}
      </div>
    );
  }
}

UserToolbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onDesignSettingsClick: PropTypes.func.isRequired,
  onFriendsClick: PropTypes.func.isRequired,
  onMessagesClick: PropTypes.func.isRequired,
  onNotificationsClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default UserToolbar;
