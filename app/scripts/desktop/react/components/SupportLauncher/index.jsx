import React, { Component } from 'react';
import ConversationsStore from '../../messaging/stores/ConversationsStore';
import ConversationActions from '../../messaging/actions/ConversationActions';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';

const SUPPORT_ID = 3; //prod env

class SupportLauncherContainer extends Component {
  state = {
    hasUnread: false,
  };
  componentWillMount() {
    this.syncStateWithStore = () => this.setState(this.getStateFromStore.bind(this));
    ConversationsStore.addChangeListener(this.syncStateWithStore);
  }
  componentWillUnmount() {
    ConversationsStore.removeChangeListener(this.syncStateWithStore);
  }
  getStateFromStore() {
    return { hasUnread: !!ConversationsStore.unreadCountByUserId(SUPPORT_ID) };
  }
  handleClick() {
    ConversationActions.openConversation(SUPPORT_ID);
  }
  render() {
    return <SupportLauncher hasUnread={this.state.hasUnread} onClick={this.handleClick.bind(this)} />;
  }
}

export default SupportLauncherContainer;
