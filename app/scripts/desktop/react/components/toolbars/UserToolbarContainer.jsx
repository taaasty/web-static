import assign from 'react/lib/Object.assign';
import CurrentUserStore from '../../stores/current_user';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import ToolbarActionCreators from '../../actions/Toolbar';
import PopupActionCreators from '../../actions/popup';
import UserToolbar from './UserToolbar';

const STORAGE_KEY = 'states:mainToolbarOpened';
const SEARCH_TITLE_I18N_KEYS = [
  'live', 'best', 'friends', 'anonymous', 'mytlog',
  'tlog', 'favorites', 'privates', 'people'
];

let UserToolbarContainer = React.createClass({
  propTypes: {
    userLogged: React.PropTypes.bool.isRequired,
    unreadConversationsCount: React.PropTypes.number.isRequired,
    unreadNotificationsCount: React.PropTypes.number.isRequired,
    searchUrl: React.PropTypes.string.isRequired,
    searchTitleI18nKey: React.PropTypes.oneOf(SEARCH_TITLE_I18N_KEYS).isRequired
  },

  getInitialState() {
    return {
      opened: JSON.parse(localStorage.getItem(STORAGE_KEY)) || false,
      openedTemporarily: false,
      hovered: false
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
      onNotificationsClick: this.toggleNotifications,
      onFriendsClick: this.toggleFriends,
      onDesignSettingsClick: this.toggleDesignSettings,
      onSettingsClick: this.showSettings,
      onSearchClick: this.showSearch
    };

    return <UserToolbar {...this.props} {...this.state} {...actions} />;
  },

  toggleOpenness() {
    let newOpenness = !this.state.opened;
    newOpenness ? this.open() : this.close();
  },

  open() {
    localStorage.setItem(STORAGE_KEY, true);
    ToolbarActionCreators.toggleOpenness(true);
    this.setState({opened: true});
  },

  close() {
    localStorage.setItem(STORAGE_KEY, false);
    ToolbarActionCreators.toggleOpenness(false);
    this.setState({opened: false});
  },

  toggleMessages() {
    PopupActionCreators.toggleMessages();
  },

  toggleNotifications() {
    PopupActionCreators.toggleNotifications();
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
      searchTitleI18nKey: this.props.searchTitleI18nKey
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
  }
});

UserToolbarContainer = connectToStores(UserToolbarContainer, [CurrentUserStore, MessagingStatusStore], (props) => ({
  user: CurrentUserStore.getUser(),
  userLogged: CurrentUserStore.isLogged(),
  // userLogged: false,
  unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
  unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()
}));

export default UserToolbarContainer;