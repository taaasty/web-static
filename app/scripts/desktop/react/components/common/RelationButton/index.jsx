import React, { Component, PropTypes } from 'react';
import ErrorService from '../../../../../shared/react/services/Error';

import * as constants from './constants';

import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';
import CancelButton from './CancelButton';
import BaseRelationButton from './BaseRelationButton';

export default class RelationButton extends Component {
  static propTypes = {
    objectID: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    relState: PropTypes.string,
    subjectID: PropTypes.number,
    subjectPrivacy: PropTypes.bool,
  }
  state = {
    relState: this.props.relState,
  }
  onStateChange(newRelState) {
    this.setState({ relState: newRelState });
    if (this.props.onChange) {
      this.props.onChange(newRelState);
    }
  }
  render() {
    const { objectID, subjectID, subjectPrivacy } = this.props;
    const props = {
      objectID,
      subjectID,
      subjectPrivacy,
      onStateChange: this.onStateChange.bind(this),
      relState: this.state.relState,
    };

    switch(this.state.relState) {
    case constants.REL_FRIEND_STATE:
      return <UnfollowButton {...props} />;
    case constants.REL_REQUESTED_STATE:
    case constants.REL_IGNORED_STATE:
      return <CancelButton {...props} />;
    case constants.REL_GUESSED_STATE:
    case constants.REL_NONE_STATE:
      return <FollowButton {...props} />;
    default:
      ErrorService.notifyError('Неизвестное состояние отношений', {
        componentName: this.constructor.displayName,
        method: 'handleClick',
        relState: this.state.relState,
      });
      return <BaseRelationButton { ...props} />;
    }
  }
}
