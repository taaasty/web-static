/*global i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { cancel, follow, resetError, unfollow } from '../../actions/RelationshipActions';

const REL_FRIEND_STATE = 'friend';
const REL_REQUESTED_STATE = 'requested';
const REL_IGNORED_STATE = 'ignored';
const REL_GUESSED_STATE = 'guessed';
const REL_NONE_STATE = 'none';

class RelationButton extends Component {
  state = {
    hover: false,
  };
  onMouseEnter() {
    this.setState({ hover: true });
  }
  onMouseLeave() {
    this.setState({ hover: false });
  }
  onTouchTap(ev) {
    const { cancel, follow, unfollow, resetError, error,
            isFetching, subjectId, relState } = this.props;

    ev.stopPropagation();
    if (!error && !isFetching ) {
      switch(relState) {
      case REL_FRIEND_STATE:
        unfollow(subjectId)
          .fail(() => window.setTimeout(() => resetError(subjectId), 1000));
        break;
      case REL_REQUESTED_STATE:
      case REL_IGNORED_STATE:
        cancel(subjectId)
          .fail(() => window.setTimeout(() => resetError(subjectId), 1000));
        break;
      case REL_GUESSED_STATE:
      case REL_NONE_STATE:
        follow(subjectId)
          .fail(() => window.setTimeout(() => resetError(subjectId), 1000));
        break;
      }
    }
  }
  renderTitle({ error, hover, isFetching, relState, subjectPrivacy }) {
    if (error) {
      return i18n.t('follow_button_error');
    } else if (isFetching) {
      return i18n.t('follow_button_process');
    } else {
      switch(relState) {
      case REL_FRIEND_STATE:
        return hover
          ? i18n.t('follow_button_unsubscribe')
          : i18n.t('follow_button_subscribed');
      case REL_REQUESTED_STATE:
        return hover
          ? i18n.t('follow_button_cancel')
          : i18n.t('follow_button_requested');
      case REL_IGNORED_STATE:
        return hover
          ? i18n.t('follow_button_unblock')
          : i18n.t('follow_button_ignored');
      case REL_GUESSED_STATE:
      case REL_NONE_STATE:
        return i18n.t(subjectPrivacy ? 'follow_button_send_request' : 'follow_button_subscribe');
      default:
        return i18n.t('follow_button_unknown_state');
      }
    }
  }
  render() {
    const { error, isFetching, relState, subjectPrivacy } = this.props;
    const buttonClasses = classnames({
      'follow-button': true,
      'state--active': !error && !isFetching && relState === REL_FRIEND_STATE,
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
          error,
          isFetching,
          relState,
          subjectPrivacy,
          hover: this.state.hover,
        })}
      </button>
    );
  }
}

RelationButton.propTypes = {
  cancel: PropTypes.func.isRequired,
  error: PropTypes.object,
  follow: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  relState: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  subjectId: PropTypes.number.isRequired,
  subjectPrivacy: PropTypes.bool,
  unfollow: PropTypes.func.isRequired,
};

export default connect(
  null,
  { cancel, follow, resetError, unfollow }
)(RelationButton);
