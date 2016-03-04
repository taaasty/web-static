import React, { createClass, PropTypes } from 'react';
import CurrentUserStore from '../../stores/current_user';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import FeedsStatusStore from '../../stores/FeedsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import ToolbarActionCreators from '../../actions/Toolbar';
import { initialCounts } from '../../actions/FeedsUpdateActions';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';

const STORAGE_KEY = 'states:mainToolbarOpened';
const SEARCH_TITLE_I18N_KEYS = [
  'live', 'best', 'friends', 'anonymous', 'mytlog',
  'tlog', 'favorites', 'privates', 'people', 'flow',
];

const UserToolbarContainer = createClass({
  propTypes: {
    searchTitleI18nKey: PropTypes.oneOf(SEARCH_TITLE_I18N_KEYS).isRequired,
    searchUrl: PropTypes.string.isRequired,
    unreadAnonymousCount: PropTypes.number.isRequired,
    unreadBestCount: PropTypes.number.isRequired,
    unreadConversationsCount: PropTypes.number.isRequired,
    unreadFriendsCount: PropTypes.number.isRequired,
    unreadLiveCount: PropTypes.number.isRequired,
    unreadLiveFlowCount: PropTypes.number.isRequired,
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
    const { unreadAnonymousCount, unreadBestCount, unreadFriendsCount,
            unreadLiveCount, unreadLiveFlowCount } = this.props.originalProps;

    ToolbarActionCreators.initVisibility(this.state.opened);
    initialCounts({
      liveInitialCount: unreadLiveCount || 0,
      bestInitialCount: unreadBestCount || 0,
      friendsInitialCount: unreadFriendsCount || 0,
      anonymousInitialCount: unreadAnonymousCount || 0,
      liveFlowInitialCount: unreadLiveFlowCount || 0,
    });
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onDocumentScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onDocumentScroll);
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

  toggleMessages(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleMessages();
  },

  showNotifications(ev) {
    ev.preventDefault();
    PopupActionCreators.showNotifications();
    // Если тулбар был открыт временно, при этом открыли уведомления, то не позволяем
    // закрыться тулбару
    this.setState({
      opened: true,
      openedTemporarily: false
    });
  },

  toggleFriends(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleFriends();
  },

  toggleDesignSettings(ev) {
    PopupActionCreators.toggleDesignSettings(ev);
  },

  showSettings(ev) {
    ev.preventDefault();
    PopupActionCreators.showSettings();
  },

  showSearch(ev) {
    ev.preventDefault();
    PopupActionCreators.showSearch({
      searchUrl: this.props.searchUrl,
      searchTitleI18nKey: this.props.searchTitleI18nKey,
    });
  },

  handleMouseEnter() {
    this.setState({hovered: true});
  },

  handleMouseLeave(ev) {
    if (ev.clientX <= 0) {
      return;
    }

    if (this.state.openedTemporarily) {
      this.setState({
        openedTemporarily: false,
        hovered: false,
      });
      ToolbarActionCreators.toggleOpenness(false);
    } else {
      this.setState({ hovered: false });
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

  render() {
    const actions = {
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
});

export default connectToStores(
  UserToolbarContainer,
  [ CurrentUserStore, FeedsStatusStore, MessagingStatusStore ],
  (props) => ({
    originalProps: props,
    user: CurrentUserStore.getUser(),
    userLogged: CurrentUserStore.isLogged(),
    unreadAnonymousCount: FeedsStatusStore.getUnreadAnonymousCount(),
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
    unreadFriendsCount: FeedsStatusStore.getUnreadFriendsCount(),
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
    unreadLiveFlowCount: FeedsStatusStore.getUnreadLiveFlowCount(),
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount(),
  })
);
