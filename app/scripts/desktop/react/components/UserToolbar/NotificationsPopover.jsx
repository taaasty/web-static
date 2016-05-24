import React, { Component, PropTypes } from 'react';
import Notifications from '../Notifications';
import Popover from './Popover';

class NotificationsPopover extends Component {
  render() {
    return (
      <Popover hide={this.props.hide}>
        <div className="popup popup--notifications popup--light front-layer">
          <div className="popup__arrow popup__arrow--up" />
          <div className="popup__content">
            <div className="popup__body">
              <Notifications />
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
