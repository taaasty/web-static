/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NoticeService from '../../services/Notice';
import { connect } from 'react-redux';
import { tlogReport } from '../../actions/TlogActions';
import {
  ignore,
  REL_IGNORED_STATE,
} from '../../actions/RelationshipActions';

import HeroProfileDropdownMenuReportItem from './HeroProfileDropdownMenuReportItem';
import HeroProfileDropdownMenuIgnoreItem from './HeroProfileDropdownMenuIgnoreItem';

const MOUSE_LEAVE_TIMEOUT = 300;
const DROPDOWN_CLOSED = 'closed';
const DROPDOWN_OPENED = 'opened';

class HeroProfileDropdownMenu extends Component {
  state = { currentState: DROPDOWN_CLOSED };
  componentWillUnmount() {
    this.isUnmounted = true;
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }
  activateClosedState() {
    if (!this.isUnmounted) {
      this.setState({ currentState: DROPDOWN_CLOSED });
    }
  }
  activateOpenedState() {
    if (!this.isUnmounted) {
      this.setState({ currentState: DROPDOWN_OPENED });
    }
  }
  isClosedState() {
    return this.state.currentState === DROPDOWN_CLOSED;
  }
  isOpenedState() {
    return this.state.currentState === DROPDOWN_OPENED;
  }
  tlogReport() {
    const { relId, tlogReport, userId } = this.props;

    tlogReport(userId, relId)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('report_user_success'));
        this.activateClosedState();
      });
  }
  tlogBlock() {
    const { ignore, relId, userId } = this.props;

    ignore(userId, relId)
      .then(() => this.activateClosedState());
  }
  handleMouseEnter() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    if (this.isClosedState()) {
      this.activateOpenedState();
    }
  }
  handleMouseLeave() {
    if (this.isOpenedState()) {
      this.timeout = window.setTimeout((() => this.activateClosedState()), MOUSE_LEAVE_TIMEOUT);
    }
  }
  render() {
    const { status } = this.props;
    const dropdownMenuClasses = classNames({
      'action-dropdown': true,
      'position-top': true,
      'state--open': !this.isClosedState(),
    });

    return (
      <div
        className="dropdown-container"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <button className="action-menu-button">
          <i className="icon icon--dots" />
        </button>
        <span className={dropdownMenuClasses}>
          {status !== REL_IGNORED_STATE &&
           <HeroProfileDropdownMenuIgnoreItem ignore={this.tlogBlock.bind(this)} />
          }
           <HeroProfileDropdownMenuReportItem tlogReport={this.tlogReport.bind(this)} />
        </span>
      </div>
    );
  }
}

HeroProfileDropdownMenu.propTypes = {
  ignore: PropTypes.func.isRequired,
  relId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  tlogReport: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(
  (state, ownProps) => ownProps,
  { ignore, tlogReport }
)(HeroProfileDropdownMenu);
