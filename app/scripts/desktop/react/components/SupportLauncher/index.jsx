import React, { Component, PropTypes } from 'react';
import ConversationsStore from '../../messaging/stores/ConversationsStore';
import ConversationActions from '../../messaging/actions/ConversationActions';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';
import EmailForm from './EmailForm';

export const SUPPORT_ID = 3; //prod env

class SupportLauncherContainer extends Component {
  state = Object.assign({}, this.getStateFromStore(), { isEmailFormVisible: false });
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
    if (this.props.user.id) {
      ConversationActions.openConversation(SUPPORT_ID);
    } else {
      this.setState({ isEmailFormVisible: true });
    }
  }
  handleClose() {
    this.setState({ isEmailFormVisible: false });
  }
  render() {
    return this.state.isEmailFormVisible
      ? <EmailForm onClose={this.handleClose.bind(this)} />
      : <SupportLauncher hasUnread={this.state.hasUnread} onClick={this.handleClick.bind(this)} />;
  }
}

SupportLauncherContainer.propTypes = {
  user: PropTypes.object,
};

export default SupportLauncherContainer;
