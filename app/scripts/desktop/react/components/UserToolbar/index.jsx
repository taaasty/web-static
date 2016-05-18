import React, { Component, PropTypes } from 'react';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';
import { connect } from 'react-redux';
import { SEARCH_KEYS } from '../../constants/SearchConstants';

const bodyClass = 'body-toolbar-main';

class UserToolbarContainer extends Component {
  state = {
    fixed: true,
  };
  componentDidMount() {
    window.document.body.classList.add(bodyClass);
    this.scrollHandler = this.onDocumentScroll.bind(this);
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
  showNotifications(ev) {
    ev.preventDefault();
    PopupActionCreators.showNotifications();
  }
  toggleFriends(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleFriends();
  }
  toggleDesignSettings(ev) {
    PopupActionCreators.toggleDesignSettings(ev);
  }
  showSettings(ev) {
    ev.preventDefault();
    PopupActionCreators.showSettings();
  }
  showSearch(ev) {
    
  }
  onDocumentScroll() {
    if (this.state.opened) {
      this.close();
    }
  }
  render() {
    return (
      <UserToolbar {...this.props}
        onDesignSettingsClick={this.toggleDesignSettings.bind(this)}
        onFriendsClick={this.toggleFriends.bind(this)}
        onMessagesClick={this.toggleMessages.bind(this)}
        onNotificationsClick={this.showNotifications.bind(this)}
        onSearchClick={this.showSearch.bind(this)}
        onSettingsClick={this.showSettings.bind(this)}
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
