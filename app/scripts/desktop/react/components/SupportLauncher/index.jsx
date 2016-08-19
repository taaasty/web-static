/*global setTimeout, clearTimeout */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import SupportLauncher from '../../../../shared/react/components/common/SupportLauncher';
import EmailForm from './EmailForm';
import Terms from './Terms';
import {
  showMessagesPopup,
} from '../../actions/AppStateActions';
import {
  sendSupportRequest,
} from '../../actions/SupportActions';
import { connect } from 'react-redux';

export const SUPPORT_ID = 3; //prod env
const HOVER_LEAVE_TIMEOUT = 500;

class SupportLauncherContainer extends Component {
  state = {
    isEmailFormVisible: false,
    isHover: false,
  };
  handleClick() {
    const {
      showMessagesPopup,
      user,
    } = this.props;

    if (user.id) {
      showMessagesPopup(SUPPORT_ID);
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
    const {
      hasUnread,
      sendSupportRequest,
    } = this.props;
    const {
      isEmailFormVisible,
      isHover,
    } = this.state;
    const termsContainer = classNames({
      'terms-panel__container': true,
      'terms-panel__container--open': isHover,
    });

    return (
      <div>
        {isEmailFormVisible && (
          <EmailForm
            onClose={this.handleClose.bind(this)}
            sendSupportRequest={sendSupportRequest}
          />
        )}
        <div
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
        >
          <SupportLauncher
            hasUnread={hasUnread}
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
  hasUnread: PropTypes.bool.isRequired,
  sendSupportRequest: PropTypes.func.isRequired,
  showMessagesPopup: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(
  (state) => {
    const supportConversation = state
      .entities
      .get('conversation')
      .filter((c) => c.get('recipientId') === SUPPORT_ID);

    return {
      hasUnread: supportConversation.count() > 0 &&
        !!supportConversation.first().get('unreadMessagesCount', false),
    };
  },
  {
    sendSupportRequest,
    showMessagesPopup,
  }
)(SupportLauncherContainer);
