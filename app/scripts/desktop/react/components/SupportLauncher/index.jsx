/*global setTimeout, clearTimeout */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ConversationsStore from '../../messaging/stores/ConversationsStore';
import ConversationActions from '../../messaging/actions/ConversationActions';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';
import EmailForm from './EmailForm';
import Terms from './Terms';

export const SUPPORT_ID = 3; //prod env
const HOVER_LEAVE_TIMEOUT = 500;

class SupportLauncherContainer extends Component {
  state = Object.assign({}, this.getStateFromStore(), { isEmailFormVisible: false, isHover: false });
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
  handleMouseEnter() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    this.setState({ isHover: true });
  }
  handleMouseLeave() {
    this.hoverTimeout = setTimeout(() => this.setState({ isHover: false }), HOVER_LEAVE_TIMEOUT);
  }
  render() {
    const { isEmailFormVisible, isHover } = this.state;
    const termsContainer = classNames({
      'terms-panel__container': true,
      'terms-panel__container--open': isHover,
    });

    return (
      <div>
        {isEmailFormVisible && <EmailForm onClose={this.handleClose.bind(this)} />}
        <div
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
        >
          <SupportLauncher
            hasUnread={this.state.hasUnread}
            onClick={this.handleClick.bind(this)}
          >
            <div className={termsContainer}>
              <Terms />
            </div>
          </SupportLauncher>
        </div>
      </div>
    );
  }
}

SupportLauncherContainer.propTypes = {
  user: PropTypes.object,
};

export default SupportLauncherContainer;
