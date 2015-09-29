import React, { createClass, PropTypes } from 'react';
import assign from 'react/lib/Object.assign';
import CurrentUserStore from '../../stores/current_user';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import FeedsStatusStore from '../../stores/FeedsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import ToolbarActionCreators from '../../actions/Toolbar';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';

const STORAGE_KEY = 'states:mainToolbarOpened';
const SEARCH_TITLE_I18N_KEYS = [
  'live', 'best', 'friends', 'anonymous', 'mytlog',
  'tlog', 'favorites', 'privates', 'people',
];

let UserToolbarContainer = createClass({
  propTypes: {
    searchTitleI18nKey: PropTypes.oneOf(SEARCH_TITLE_I18N_KEYS).isRequired,
    searchUrl: PropTypes.string.isRequired,
    unreadBestCount: PropTypes.number.isRequired,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadLiveCount: PropTypes.number.isRequired,
    unreadNotificationsCount: PropTypes.number.isRequired,
    userLogged: PropTypes.bool.isRequired,
  },

  getInitialState() {
    return {
      opened: JSON.parse(AppStorage.getItem(STORAGE_KEY)) || false,
      openedTemporarily: false,
      hovered: false,
    };
  },

  componentWillMount() {
    ToolbarActionCreators.initVisibility(this.state.opened);
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onDocumentScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onDocumentScroll);
  },

  render() {
    let actions = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onToggleClick: this.toggleOpenness,
      onLineHover: this.handleLineHover,
      onMessagesClick: this.toggleMessages,
      onNotificationsClick: this.showNotifications,
      onFriendsClick: this.toggleFriends,
      onDesignSettingsClick: this.toggleDesignSettings,
      onSettingsClick: this.showSettings,
      onSearchClick: this.showSearch,
    };

    return <UserToolbar {...this.props} {...this.state} {...actions} />;
  },

  toggleOpenness() {
    !this.state.opened
      ? this.open()
      : this.close();
  },

  open() {
    AppStorage.setItem(STORAGE_KEY, true);
    ToolbarActionCreators.toggleOpenness(true);
    this.setState({
      opened: true,
      openedTemporarily: false,
    });
  },

  close() {
    AppStorage.setItem(STORAGE_KEY, false);
    ToolbarActionCreators.toggleOpenness(false);
    this.setState({
      opened: false,
      openedTemporarily: false,
    });
  },

  toggleMessages() {
    PopupActionCreators.toggleMessages();
  },

  showNotifications() {
    PopupActionCreators.showNotifications();
    // Если тулбар был открыт временно, при этом открыли уведомления, то не позволяем
    // закрыться тулбару
    this.setState({
      opened: true,
      openedTemporarily: false
    });
  },

  toggleFriends() {
    PopupActionCreators.toggleFriends();
  },

  toggleDesignSettings() {
    PopupActionCreators.toggleDesignSettings();
  },

  showSettings() {
    PopupActionCreators.showSettings();
  },

  showSearch() {
    PopupActionCreators.showSearch({
      searchUrl: this.props.searchUrl,
      searchTitleI18nKey: this.props.searchTitleI18nKey,
    });
  },

  handleMouseEnter() {
    this.setState({hovered: true});
  },

  handleMouseLeave() {
    if (this.state.openedTemporarily) {
      this.setState({
        openedTemporarily: false,
        hovered: false
      });
      ToolbarActionCreators.toggleOpenness(false);
    } else {
      this.setState({hovered: false});
    }
  },

  handleLineHover() {
    if (!this.state.opened) {
      this.setState({openedTemporarily: true});
      ToolbarActionCreators.toggleOpenness(true);
    }
  },

  onDocumentScroll() {
    if (this.state.opened) {
      this.close();
    }
  },
});

UserToolbarContainer = connectToStores(
  UserToolbarContainer,
  [CurrentUserStore, FeedsStatusStore, MessagingStatusStore],
  () => ({
    user: CurrentUserStore.getUser(),
    userLogged: CurrentUserStore.isLogged(),
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount(),
  })
);

export default UserToolbarContainer;
