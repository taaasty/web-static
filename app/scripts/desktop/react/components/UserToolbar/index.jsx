import { merge } from 'lodash';
import React, { Component, PropTypes } from 'react';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { SEARCH_KEYS } from '../../constants/SearchConstants';

const bodyClass = 'body-toolbar-main';

class UserToolbarContainer extends Component {
  state = {
    fixed: true,
    isNotificationsPopoverVisible: false,
    isUserPopoverVisible: false,
  };
  componentDidMount() {
    window.document.body.classList.add(bodyClass);
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.document.body.classList.remove(bodyClass);
    window.removeEventListener('scroll', this.scrollHandler);
  }
  toggleMessages(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleMessages();
  }
  toggleNotifications(ev) {
    ev.preventDefault();
    this.setState({ isNotificationsPopoverVisible: !this.state.isNotificationsPopoverVisible });
  }
  toggleFriends(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleFriends();
  }
  toggleDesignSettings(ev) {
    PopupActionCreators.toggleDesignSettings(ev);
  }
  toggleUserPopover() {
    this.setState({ isUserPopoverVisible: !this.state.isUserPopoverVisible });
  }
  showSettings(ev) {
    ev.preventDefault();
    PopupActionCreators.showSettings();
  }
  showSearch(q) {
    if (q.length) {
      browserHistory.push(merge({}, this.props.location, { query: { q }}));
    }
  }
  hideNotificationsPopover() {
    this.setState({ isNotificationsPopoverVisible: false });
  }
  hideUserPopover() {
    this.setState({ isUserPopoverVisible: false });
  }
  handleScroll() {
    this.hideNotificationsPopover();
    this.hideUserPopover();
  }
  render() {
    const { pathname, query } = this.props.location;
    const { isNotificationsPopoverVisible, isUserPopoverVisible } = this.state;

    return (
      <UserToolbar {...this.props}
        hideNotificationsPopover={this.hideNotificationsPopover.bind(this)}
        hideUserPopover={this.hideUserPopover.bind(this)}
        isNotificationsPopoverVisible={isNotificationsPopoverVisible}
        isUserPopoverVisible={isUserPopoverVisible}
        onDesignSettingsClick={this.toggleDesignSettings.bind(this)}
        onFriendsClick={this.toggleFriends.bind(this)}
        onMessagesClick={this.toggleMessages.bind(this)}
        onNotificationsClick={this.toggleNotifications.bind(this)}
        onSearchClick={this.showSearch.bind(this)}
        onSettingsClick={this.showSettings.bind(this)}
        onUserClick={this.toggleUserPopover.bind(this)}
        pathname={pathname}
        query={query && query.q}
      />
    );
  }
}

UserToolbarContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  searchKey: PropTypes.oneOf(SEARCH_KEYS).isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default connectToStores(
  connect(
    (state, { location }) => {
      const { unreadFriendsCount } = state.feedStatus;

      return {
        location,
        unreadFriendsCount,
        currentUser: state.currentUser.data,
        searchKey: state.appState.data.searchKey,
      };
    }
  )(UserToolbarContainer),
  [ MessagingStatusStore ],
  (props) => ({
    ...props,
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount(),
  })
);
