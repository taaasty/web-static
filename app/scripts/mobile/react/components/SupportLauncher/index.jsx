import React, { Component, PropTypes } from 'react';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';
import ConversationStore from '../../stores/conversation';
import EmailForm from './EmailForm';

const SUPPORT_ID = 3;

class SupportLauncherContainer extends Component {
  state = Object.assign({}, this.stateFromStore(), { isEmailFormVisible: false });
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
  handleClick(ev) {
    if (!this.props.user) {
      ev.preventDefault();
      this.setState({ isEmailFormVisible: true })
    }
  }
  render() {
    const { user } = this.props;
    const { hasUnread, isEmailFormVisible } = this.state;
    const url = user && user.tlog_url
            ? `${user.tlog_url}/conversations/by_user_id/${SUPPORT_ID}`
            : '#';

    return (
      <span>
        <a href={url} onClick={this.handleClick.bind(this)}>
          <SupportLauncher hasUnread={hasUnread} />
        </a>
        {isEmailFormVisible && <EmailForm />}
      </span>
    );
  }
}

SupportLauncherContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SupportLauncherContainer;
