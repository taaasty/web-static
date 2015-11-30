/*global TastyEvents */
import React, { createClass, PropTypes } from 'react';
import classnames from 'classnames';

import HeroProfileDropdownMenuReportItem from './HeroProfileDropdownMenuReportItem';
import HeroProfileDropdownMenuIgnoreItem from './HeroProfileDropdownMenuIgnoreItem';

const MOUSE_LEAVE_TIMEOUT = 300;
const DROPDOWN_CLOSED = 'closed';
const DROPDOWN_OPENED = 'opened';

const HeroProfileDropdownMenu = createClass({
  mixins: [ ComponentManipulationsMixin ],
  propTypes: {
    userId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  },

  getInitialState() {
    return ({
      currentState: DROPDOWN_CLOSED,
      status: this.props.status,
    });
  },

  componentDidMount() {
    TastyEvents.on(TastyEvents.keys.follow_status_changed(this.props.userId), this.updateFollowStatus);
  },

  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  },

  activateClosedState() {
    this.safeUpdateState({ currentState: DROPDOWN_CLOSED });
  },
  
  activateOpenedState() {
    this.safeUpdateState({ currentState: DROPDOWN_OPENED });
  },

  isClosedState() {
    return this.state.currentState === DROPDOWN_CLOSED;
  },
  
  isOpenedState() {
    return this.state.currentState === DROPDOWN_OPENED;
  },

  updateFollowStatus(newStatus) {
    this.safeUpdateState({ status: newStatus });
  },

  handleMouseEnter() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    if (this.isClosedState()) {
      this.activateOpenedState();
    }
  },

  handleMouseLeave() {
    if (this.isOpenedState()) {
      this.timeout = window.setTimeout((() => this.activateClosedState()), MOUSE_LEAVE_TIMEOUT);
    }
  },
  
  render() {
    const dropdownMenuClasses = classnames({
      'action-dropdown': true,
      'position-top': true,
      'state--open': !this.isClosedState(),
    });

    return (
      <div
        className="dropdown-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <button className="action-menu-button">
          <i className="icon icon--dots" />
        </button>
        <span className={dropdownMenuClasses}>
          {this.state.status !== 'ignored' &&
           <HeroProfileDropdownMenuIgnoreItem
             onRequestEnd={this.activateClosedState}
             userId={this.props.userId}
           />
          }
          <HeroProfileDropdownMenuReportItem
            onRequestEnd={this.activateClosedState}
            userId={this.props.userId}
          />
        </span>
      </div>
    );
  },
});

export default HeroProfileDropdownMenu;
