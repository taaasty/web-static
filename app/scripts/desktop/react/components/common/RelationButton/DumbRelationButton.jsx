/*global i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as constants from './constants';

export default class DumbRelationButton extends Component {
  static propTypes = {
    active: PropTypes.bool,
    buttonState: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func.isRequired,
    relState: PropTypes.string,
    subjectPrivacy: PropTypes.bool,
  }
  state = {
    hover: false,
  }
  onMouseEnter() {
    this.setState({ hover: true });
  }
  onMouseLeave() {
    this.setState({ hover: false });
  }
  onTouchTap(ev) {
    ev.stopPropagation();
    if (this.props.buttonState === constants.BUTTON_SHOW_STATE) {
      this.props.onTouchTap();
    }
  }
  renderTitle({ buttonState, hover, relState, subjectPrivacy }) {
    switch(buttonState) {
    case constants.BUTTON_ERROR_STATE: return i18n.t('follow_button_error');
    case constants.BUTTON_PROCESS_STATE: return i18n.t('follow_button_process');
    default:
      switch(relState) {
      case constants.REL_FRIEND_STATE:
        return hover
          ? i18n.t('follow_button_unsubscribe')
          : i18n.t('follow_button_subscribed');
      case constants.REL_REQUESTED_STATE:
        return hover
          ? i18n.t('follow_button_cancel')
          : i18n.t('follow_button_requested');
      case constants.REL_IGNORED_STATE:
        return hover
          ? i18n.t('follow_button_unblock')
          : i18n.t('follow_button_ignored');
      case constants.REL_GUESSED_STATE:
      case constants.REL_NONE_STATE:
        return i18n.t(subjectPrivacy ? 'follow_button_send_request' : 'follow_button_subscribe');
      default:
        return i18n.t('follow_button_unknown_state');
      }
    }
  }
  render() {
    const { buttonState, relState, subjectPrivacy } = this.props;
    const buttonClasses = classnames('follow-button', {
      'state--active': this.props.active,
    });

    // Inline-block needed for prevent AdBlock social buttons hiding
    return (
      <button
        className={buttonClasses}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onTouchTap={this.onTouchTap.bind(this)}
        style={{display: 'inline-block!important'}}
      >
        {this.renderTitle({
          buttonState,
          relState,
          subjectPrivacy,
          hover: this.state.hover,
        })}
      </button>
    );
  }
}
