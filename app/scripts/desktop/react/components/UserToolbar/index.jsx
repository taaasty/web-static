/*global AppStorage */
import React, { Component, PropTypes } from 'react';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';
import { connect } from 'react-redux';
import { SEARCH_KEYS } from '../../constants/SearchConstants';

const bodyClassName = 'main-toolbar-open';
const STORAGE_KEY = 'states:mainToolbarOpened';

class UserToolbarContainer extends Component {
  state = {
    opened: JSON.parse(AppStorage.getItem(STORAGE_KEY)) || false,
    openedTemporarily: false,
    hovered: false,
  };
  componentWillMount() {
    document.body.classList[this.state.opened ? 'add' : 'remove'](bodyClassName);
  }
  componentDidMount() {
    this.scrollHandler = this.onDocumentScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  toggleOpenness() {
    (!this.state.opened ? this.open() : this.close());
  }
  open() {
    document.body.classList.add(bodyClassName);
    AppStorage.setItem(STORAGE_KEY, true);
    this.setState({
      opened: true,
      openedTemporarily: false,
    });
  }
  close() {
    document.body.classList.remove(bodyClassName);
    AppStorage.setItem(STORAGE_KEY, false);
    this.setState({
      opened: false,
      openedTemporarily: false,
    });
  }
  toggleMessages(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleMessages();
  }
  showNotifications(ev) {
    ev.preventDefault();
    PopupActionCreators.showNotifications();
    // Если тулбар был открыт временно, при этом открыли уведомления, то не позволяем
    // закрыться тулбару
    this.setState({
      opened: true,
      openedTemporarily: false,
    });
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
    ev.preventDefault();
    PopupActionCreators.showSearch({
      location: this.props.location,
      searchKey: this.props.searchKey,
    });
  }
  onDocumentScroll() {
    if (this.state.opened) {
      this.close();
    }
  }
  handleMouseEnter() {
    this.setState({hovered: true});
  }
  handleMouseLeave(ev) {
    if (ev.clientX <= 0) {
      return;
    }

    if (this.state.openedTemporarily) {
      this.setState({
        openedTemporarily: false,
        hovered: false,
      });
      document.body.classList.remove(bodyClassName);
    } else {
      this.setState({ hovered: false });
    }
  }
  handleLineHover() {
    if (!this.state.opened) {
      this.setState({openedTemporarily: true});
      document.body.classList.add(bodyClassName);
    }
  }
  render() {
    const actions = {
      onMouseEnter: this.handleMouseEnter.bind(this),
      onMouseLeave: this.handleMouseLeave.bind(this),
      onToggleClick: this.toggleOpenness.bind(this),
      onLineHover: this.handleLineHover.bind(this),
      onMessagesClick: this.toggleMessages.bind(this),
      onNotificationsClick: this.showNotifications.bind(this),
      onFriendsClick: this.toggleFriends.bind(this),
      onDesignSettingsClick: this.toggleDesignSettings.bind(this),
      onSettingsClick: this.showSettings.bind(this),
      onSearchClick: this.showSearch.bind(this),
    };

    return <UserToolbar {...this.props} {...this.state} {...actions} />;
  }
}

UserToolbarContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  searchKey: PropTypes.oneOf(SEARCH_KEYS).isRequired,
  unreadAnonymousCount: PropTypes.number.isRequired,
  unreadBestCount: PropTypes.number.isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
  unreadLiveCount: PropTypes.number.isRequired,
  unreadLiveFlowCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
};

export default connectToStores(
  connect(
    (state, { location }) => {
      const { unreadAnonymousCount, unreadBestCount, unreadFriendsCount,
              unreadLiveCount, unreadLiveFlowCount } = state.feedStatus;

      return {
        location,
        unreadAnonymousCount,
        unreadBestCount,
        unreadFriendsCount,
        unreadLiveCount,
        unreadLiveFlowCount,
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
