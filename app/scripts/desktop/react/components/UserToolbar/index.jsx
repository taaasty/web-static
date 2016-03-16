/*global gon, AppStorage */
import React, { Component, PropTypes } from 'react';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import {
  feedAnonymousNewEntry,
  feedBestNewEntry,
  feedFriendsNewEntry,
  feedLiveNewEntry,
  feedLiveFlowNewEntry,
} from '../../actions/FeedStatusActions';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';
import { connect } from 'react-redux';
import ApiRoutes from '../../../../shared/routes/api';
import Pusher from 'pusher';
import { SEARCH_KEYS } from '../../constants/SearchConstants';

const PUSHER_NEW_ENTRY = 'new_entry';
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
    this.connectToPusher();
  }
  componentDidMount() {
    this.scrollHandler = this.onDocumentScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  connectToPusher() {
    if (!(gon.pusher && gon.pusher.key)) {
      return;
    }

    const { currentUser, feedAnonymousNewEntry, feedBestNewEntry,
            feedFriendsNewEntry, feedLiveNewEntry, feedLiveFlowNewEntry } = this.props;
    const userToken = currentUser.api_key && currentUser.api_key.access_token;
    const authOptions = userToken
            ? {
                auth: {
                  headers: {
                    'X-User-Token': userToken,
                  },
                },
              }
            : null;

    const pusher = new Pusher(gon.pusher.key, {
      authEndpoint: ApiRoutes.pusher_auth_url(),
      pong_timeout: 6000,
      unavailable_timeout: 2000,
      ...authOptions,
    });

    const channelLive = pusher.subscribe('live');
    const channelBest = pusher.subscribe('best');
    const channelAnonymous = pusher.subscribe('anonymous');
    const channelLiveFlow = pusher.subscribe('live_flow_entries');

    channelLive.bind(PUSHER_NEW_ENTRY, feedLiveNewEntry);
    channelBest.bind(PUSHER_NEW_ENTRY, feedBestNewEntry);
    channelAnonymous.bind(PUSHER_NEW_ENTRY, feedAnonymousNewEntry);
    channelLiveFlow.bind(PUSHER_NEW_ENTRY, feedLiveFlowNewEntry);

    if (userToken && currentUser.id) {
      const channelFriends = pusher.subscribe(`private-${currentUser.id}-friends`);

      channelFriends.bind(PUSHER_NEW_ENTRY, feedFriendsNewEntry);
    }
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
  feedAnonymousNewEntry: PropTypes.func.isRequired,
  feedBestNewEntry: PropTypes.func.isRequired,
  feedFriendsNewEntry: PropTypes.func.isRequired,
  feedLiveFlowNewEntry: PropTypes.func.isRequired,
  feedLiveNewEntry: PropTypes.func.isRequired,
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
    },
    {
      feedAnonymousNewEntry,
      feedBestNewEntry,
      feedFriendsNewEntry,
      feedLiveNewEntry,
      feedLiveFlowNewEntry,
    }
  )(UserToolbarContainer),
  [ MessagingStatusStore ],
  (props) => ({
    ...props,
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount(),
  })
);
