import classnames from 'classnames';
import Scroller from '../common/scroller/scroller';
import UserToolbarToggle from './UserToolbarToggle';
import UserToolbarHoverLine from './UserToolbarHoverLine';
import UserToolbarPrimaryList from './UserToolbarPrimaryList';
import UserToolbarAdditionalList from './UserToolbarAdditionalList';
import UserToolbarGuestList from './UserToolbarGuestList';

let UserToolbar = React.createClass({
  propTypes: {
    hovered: React.PropTypes.bool.isRequired,
    userLogged: React.PropTypes.bool.isRequired,
    unreadBestCount: React.PropTypes.number.isRequired,
    unreadConversationsCount: React.PropTypes.number.isRequired,
    unreadLiveCount: React.PropTypes.number.isRequired,
    unreadNotificationsCount: React.PropTypes.number.isRequired,
    searchUrl: React.PropTypes.string.isRequired,
    searchTitleI18nKey: React.PropTypes.string.isRequired,
    onMouseEnter: React.PropTypes.func.isRequired,
    onMouseLeave: React.PropTypes.func.isRequired,
    onToggleClick: React.PropTypes.func.isRequired,
    onLineHover: React.PropTypes.func.isRequired,
    onMessagesClick: React.PropTypes.func.isRequired,
    onNotificationsClick: React.PropTypes.func.isRequired,
    onFriendsClick: React.PropTypes.func.isRequired,
    onDesignSettingsClick: React.PropTypes.func.isRequired,
    onSettingsClick: React.PropTypes.func.isRequired,
    onSearchClick: React.PropTypes.func.isRequired,
  },

  render() {
    let navbarClasses = classnames('toolbar__navbar', {
      'toolbar__navbar--complex': this.props.userLogged
    });

    return (
      <div className="toolbar toolbar--main"
           onMouseEnter={this.props.onMouseEnter}
           onMouseLeave={this.props.onMouseLeave}>
        <UserToolbarHoverLine onMouseEnter={this.props.onLineHover} />
        <UserToolbarToggle
          hasConversations={!!this.props.unreadConversationsCount}
          hasNotifications={!!this.props.unreadNotificationsCount}
          onClick={this.props.onToggleClick}
          onMouseEnter={this.props.onLineHover}
        />
        <div className={navbarClasses}>
          <Scroller>
            {this.renderPrimaryList()}
          </Scroller>
          {this.renderAdditionalList()}
        </div>
      </div>
    );
  },

  renderPrimaryList() {
    if (this.props.userLogged) {
      return (
        <UserToolbarPrimaryList
          onDesignSettingsClick={this.props.onDesignSettingsClick}
          onFriendsClick={this.props.onFriendsClick}
          onMessagesClick={this.props.onMessagesClick}
          onNotificationsClick={this.props.onNotificationsClick}
          stayOpen={this.props.hovered}
          unreadBestCount={this.props.unreadBestCount}
          unreadConversationsCount={this.props.unreadConversationsCount}
          unreadLiveCount={this.props.unreadLiveCount}
          unreadNotificationsCount={this.props.unreadNotificationsCount}
          user={this.props.user}
        />
      );
    } else {
      return <UserToolbarGuestList />;
    }
  },

  renderAdditionalList() {
    if (this.props.userLogged) {
      return (
        <UserToolbarAdditionalList
            user={this.props.user}
            searchTitleI18nKey={this.props.searchTitleI18nKey}
            onSettingsClick={this.props.onSettingsClick}
            onSearchClick={this.props.onSearchClick} />
      );
    }
  }
});

export default UserToolbar;
