import React, { Component, PropTypes } from 'react';
import Notifications from '../Notifications';
import Popover from './Popover';

class NotificationsPopover extends Component {
  render() {
    const {
      hide,
    } = this.props;

    return (
      <Popover hide={hide}>
        <div className="popup popup--notifications popup--light front-layer">
          <div className="popup__arrow popup__arrow--up" />
          <div className="popup__content">
            <div className="popup__body">
              <Notifications hide={hide} />
            </div>
          </div>
        </div>
      </Popover>
    );
  }
}

NotificationsPopover.propTypes = {
  hide: PropTypes.func.isRequired,
};

export default NotificationsPopover;
