/*global i18n */
import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';
import SearchForm from './SearchForm';
import AuthUserSection from './AuthUserSection';

class UserToolbar extends Component {
  renderCounter(count) {
    return count > 0
      ? <span className="toolbar__main-list-badge">` (+${count})`</span>
      : '';
  }
  render() {
    const { currentUser, onSearchClick, pathname, query, unreadFriendsCount } = this.props;
    const isLogged = !!currentUser.id;

    return (
      <div className="toolbar toolbar--main">
        <ul className="toolbar__main-list">
          <li className="toolbar__main-list-item">
            <Link className="toolbar__main-list-link" to={uri(Routes.live_feed_path()).path()}>
              <span className="tasty-chat-icon" />
              {i18n.t('toolbar.live')}
            </Link>
          </li>
          <li className="toolbar__main-list-item">
            <Link className="toolbar__main-list-link" to={uri(Routes.flows_path()).path()}>
              {i18n.t('toolbar.flows')}
            </Link>
          </li>
          <li className="toolbar__main-list-item">
            <Link className="toolbar__main-list-link" to={uri(Routes.people_path()).path()}>
              {i18n.t('toolbar.people')}
            </Link>
          </li>
          <li className="toolbar__main-list-item">
            <Link className="toolbar__main-list-link" to={uri(Routes.anonymous_feed_path()).path()}>
              {i18n.t('toolbar.anonymous')}
            </Link>
          </li>
          {isLogged &&
           <li className="toolbar__main-list-item">
             <Link className="toolbar__main-list-link" to={uri(Routes.friends_feed_path()).path()}>
               {i18n.t('toolbar.friends')}
               {this.renderCounter(unreadFriendsCount)}
             </Link>
           </li>
          }
          <li className="toolbar__main-list-item">
            <SearchForm
              onSubmit={onSearchClick}
              pathname={pathname}
              query={query}
            />
          </li>
        </ul>
        {isLogged && <AuthUserSection {...this.props} />}
      </div>
    );
  }
}

UserToolbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  hideNotificationsPopover: PropTypes.func.isRequired,
  hideUserPopover: PropTypes.func.isRequired,
  isNotificationsPopoverVisible: PropTypes.bool.isRequired,
  isUserPopoverVisible: PropTypes.bool.isRequired,
  onDesignSettingsClick: PropTypes.func.isRequired,
  onFriendsClick: PropTypes.func.isRequired,
  onMessagesClick: PropTypes.func.isRequired,
  onNotificationsClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onUserClick: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default UserToolbar;
