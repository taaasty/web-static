/*global ReactApp */
import { merge } from 'lodash';
import React, { Component, PropTypes } from 'react';
import MessagingStatusStore from '../../messaging/stores/messaging_status';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import PopupActionCreators from '../../actions/PopupActions';
import {
  showSettingsPopup,
  showGetPremiumPopup,
  toggleDesignSettingsPopup,
} from '../../actions/AppStateActions';
import UserToolbar from './UserToolbar';
import InviteRef from '../InviteRef';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class UserToolbarContainer extends Component {
  state = {
    fixed: true,
    isNotificationsPopoverVisible: false,
    isUserPopoverVisible: false,
    isRelationsPopupVisible: false,
  };
  toggleMessages(ev) {
    ev.preventDefault();
    PopupActionCreators.toggleMessages();
  }
  toggleNotifications(ev) {
    ev.preventDefault();
    this.setState({ isNotificationsPopoverVisible: !this.state.isNotificationsPopoverVisible });
  }
  toggleDesignSettings() {
    this.props.toggleDesignSettingsPopup();
  }
  toggleUserPopover() {
    this.setState({ isUserPopoverVisible: !this.state.isUserPopoverVisible });
  }
  toggleRelationsPopup() {
    this.setState({ isRelationsPopupVisible: !this.state.isRelationsPopupVisible });
  }
  showSettings(ev) {
    ev.preventDefault();
    this.props.showSettingsPopup();
  }
  showGetPremiumPopup() {
    this.props.showGetPremiumPopup();
  }
  showSearch(q) {
    if (q.length) {
      browserHistory.push(merge({}, this.props.location, { query: { q }}));
    }
  }
  showInviteShellbox() {
    ReactApp.shellbox.show(InviteRef, { inviteUrl: this.props.currentUser.invite_url });
  }
  hideNotificationsPopover() {
    this.setState({ isNotificationsPopoverVisible: false });
  }
  hideUserPopover() {
    this.setState({ isUserPopoverVisible: false });
  }
  hideRelationsPopup() {
    this.setState({ isRelationsPopupVisible: false });
  }
  render() {
    const { pathname, query } = this.props.location;
    const { isNotificationsPopoverVisible, isRelationsPopupVisible, isUserPopoverVisible } = this.state;

    return (
      <UserToolbar {...this.props}
        hideNotificationsPopover={this.hideNotificationsPopover.bind(this)}
        hideRelationsPopup={this.hideRelationsPopup.bind(this)}
        hideUserPopover={this.hideUserPopover.bind(this)}
        isNotificationsPopoverVisible={isNotificationsPopoverVisible}
        isRelationsPopupVisible={isRelationsPopupVisible}
        isUserPopoverVisible={isUserPopoverVisible}
        onDesignSettingsClick={this.toggleDesignSettings.bind(this)}
        onGetPremiumClick={this.showGetPremiumPopup.bind(this)}
        onInviteClick={this.showInviteShellbox.bind(this)}
        onMessagesClick={this.toggleMessages.bind(this)}
        onNotificationsClick={this.toggleNotifications.bind(this)}
        onRelationsClick={this.toggleRelationsPopup.bind(this)}
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
  showGetPremiumPopup: PropTypes.func.isRequired,
  showSettingsPopup: PropTypes.func.isRequired,
  toggleDesignSettingsPopup: PropTypes.func.isRequired,
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
      };
    },
    { showSettingsPopup, showGetPremiumPopup, toggleDesignSettingsPopup }
  )(UserToolbarContainer),
  [ MessagingStatusStore ],
  (props) => ({
    ...props,
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount(),
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount(),
  })
);
