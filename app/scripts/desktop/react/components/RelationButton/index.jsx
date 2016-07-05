/*global i18n */
import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { cancel, follow, unfollow } from '../../actions/RelationshipActions';

export const REL_FRIEND_STATE = 'friend';
export const REL_REQUESTED_STATE = 'requested';
export const REL_IGNORED_STATE = 'ignored';
export const REL_GUESSED_STATE = 'guessed';
export const REL_NONE_STATE = 'none';

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
    const { cancel, follow, unfollow, rel, relId, relState } = this.props;
    const error = relState.get('error');
    const isFetching = relState.get('isFetching');
    const subjectId = rel.get('userId');
    const state = rel.get('state');

    ev.stopPropagation();
    if (!error && !isFetching ) {
      switch(state) {
      case REL_FRIEND_STATE:
        unfollow(subjectId, relId);
        break;
      case REL_REQUESTED_STATE:
      case REL_IGNORED_STATE:
        cancel(subjectId, relId);
        break;
      case REL_GUESSED_STATE:
      case REL_NONE_STATE:
        follow(subjectId, relId);
        break;
      }
    }
  }
  renderTitle({ error, hover, isFetching, privacy, state }) {
    if (error) {
      return i18n.t('follow_button_error');
    } else if (isFetching) {
      return i18n.t('follow_button_process');
    } else {
      switch(state) {
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
        return i18n.t(privacy ? 'follow_button_send_request' : 'follow_button_subscribe');
      default:
        return i18n.t('follow_button_unknown_state');
      }
    }
  }
  render() {
    const { privacy, rel, relState } = this.props;
    const state = rel.get('state');
    const error = relState.get('error');
    const isFetching = relState.get('isFetching');
    const buttonClasses = classnames({
      'follow-button': true,
      'state--active': !error && !isFetching && state === REL_FRIEND_STATE,
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
          privacy,
          state,
          hover: this.state.hover,
        })}
      </button>
    );
  }
}

RelationButton.propTypes = {
  cancel: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  privacy: PropTypes.bool,
  rel: PropTypes.object.isRequired,
  relId: PropTypes.string.isRequired,
  relState: PropTypes.object.isRequired,
  unfollow: PropTypes.func.isRequired,
};

export default connect(
  (state, { relId }) => {
    const rel = state.entities.getIn([ 'rel', relId ], Map());
    const privacy = state.entities.getIn([ 'tlog', String(rel.get('userId')), 'isPrivacy' ], false);
    const relState = state.relState.get(relId, Map());

    return {
      privacy,
      rel,
      relId,
      relState,
    };
  },
  { cancel, follow, unfollow }
)(RelationButton);
