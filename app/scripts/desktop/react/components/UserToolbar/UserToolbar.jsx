/*global i18n */
import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';
import SearchForm from './SearchForm';
import AuthUserSection from './AuthUserSection';
import classNames from 'classnames';

const PINNED_STATE = 'pinned';
const UNPINNED_STATE = 'unpinned';
const UNFIXED_STATE = 'unfixed';
const TOOLBAR_SIZE = 56;

class UserToolbar extends Component {
  state = { posState: UNFIXED_STATE, noTransition: false };
  componentDidMount() {
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
    this.checkScrollPosition();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  checkScrollPosition() {
    const scrollTop = window.document.body.scrollTop ||
          window.document.documentElement.scrollTop;
    const direction = scrollTop - (this.prevScrollTop || 0); // > 0 - down
                                                             // < 0 - up
    
    if (scrollTop === 0) {
      this.setState({ posState: UNFIXED_STATE });
    } else {
      if (direction > 0) {
        if (scrollTop > TOOLBAR_SIZE) {
          let noTransition = false;

          if (this.state.posState === UNFIXED_STATE) {
            noTransition = true;
            requestAnimationFrame(() => this.setState({ noTransition: false }));
          }

          this.setState({ noTransition, posState: UNPINNED_STATE });
          
        }
      } else {
        if (scrollTop > TOOLBAR_SIZE) {
          this.setState({ posState: PINNED_STATE });
        }
      }
    }

    this.prevScrollTop = scrollTop;
  }
  handleScroll() {
    this.checkScrollPosition();

    this.props.hideNotificationsPopover();
    this.props.hideUserPopover();
  }
  renderCounter(count) {
    return count > 0
      ? <span className="toolbar__main-list-badge">` (+${count})`</span>
      : '';
  }
  render() {
    const { currentUser, onSearchClick, pathname, query, unreadFriendsCount } = this.props;
    const { posState, noTransition } = this.state;
    const isLogged = !!currentUser.id;
    const containerClasses = classNames({
      'toolbar': true,
      'toolbar--main': true,
      'toolbar--unfixed': posState === UNFIXED_STATE,
      'toolbar--pinned': posState === PINNED_STATE,
      'toolbar--unpinned': posState === UNPINNED_STATE,
      '--no-transition': noTransition,
    });

    return (
      <div className={containerClasses}>
        <ul className="toolbar__main-list">
          <li className="toolbar__main-list-item">
            <Link className="toolbar__main-list-link" to={uri(Routes.live_feed_path()).path()}>
              <i className="icon icon--ribbon" />
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
