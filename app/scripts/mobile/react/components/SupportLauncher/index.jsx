import React, { Component, PropTypes } from 'react';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';
import ConversationStore from '../../stores/conversation';

const SUPPORT_ID = 3;

class SupportLauncherContainer extends Component {
  state = this.stateFromStore();
  componentWillMount() {
    this.syncWithStore = () => this.setState(this.stateFromStore());

    ConversationStore.addChangeListener(this.syncWithStore);
  }
  componentWillUnmount() {
    ConversationStore.removeChangeListener(this.syncWithStore);
  }
  stateFromStore() {
    return {
      hasUnread: !!ConversationStore.unreadCountByUserId(SUPPORT_ID),
    };
  }
  render() {
    return (
      <a href={`${this.props.url}/conversations/by_user_id/${SUPPORT_ID}`}>
        <SupportLauncher hasUnread={this.state.hasUnread} />
      </a>
    );
  }
}

SupportLauncherContainer.propTypes = {
  url: PropTypes.string,
};

export default SupportLauncherContainer;
