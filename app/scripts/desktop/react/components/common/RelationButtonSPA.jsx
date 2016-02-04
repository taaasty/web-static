/*global i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
    const { RelationshipActions, error, isFetching, subjectId, relState } = this.props;

    ev.stopPropagation();
    if (!error && !isFetching ) {
      switch(relState) {
      case REL_FRIEND_STATE:
        RelationshipActions.unfollow(subjectId)
          .fail(() => window.setTimeout(() => RelationshipActions.resetError(subjectId), 1000));
        break;
      case REL_REQUESTED_STATE:
      case REL_IGNORED_STATE:
        RelationshipActions.cancel(subjectId)
          .fail(() => window.setTimeout(() => RelationshipActions.resetError(subjectId), 1000));
        break;
      case REL_GUESSED_STATE:
      case REL_NONE_STATE:
        RelationshipActions.follow(subjectId)
          .fail(() => window.setTimeout(() => RelationshipActions.resetError(subjectId), 1000));
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
  RelationshipActions: PropTypes.object.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  relState: PropTypes.string,
  subjectId: PropTypes.number.isRequired,
  subjectPrivacy: PropTypes.bool,
};

export default RelationButton;
