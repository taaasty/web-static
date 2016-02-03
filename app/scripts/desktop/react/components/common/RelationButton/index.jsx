import React, { Component, PropTypes } from 'react';
import ErrorService from '../../../../../shared/react/services/Error';

import * as constants from './constants';

import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';
import CancelButton from './CancelButton';
import BaseRelationButton from './BaseRelationButton';

class RelationButton extends Component {
  render() {
    const { relState } = this.props;

    switch(relState) {
    case constants.REL_FRIEND_STATE:
      return <UnfollowButton {...this.props} />;
    case constants.REL_REQUESTED_STATE:
    case constants.REL_IGNORED_STATE:
      return <CancelButton {...this.props} />;
    case constants.REL_GUESSED_STATE:
    case constants.REL_NONE_STATE:
      return <FollowButton {...this.props} />;
    default:
      ErrorService.notifyError('Неизвестное состояние отношений', {
        componentName: this.constructor.displayName,
        method: 'handleClick',
        relState: relState,
      });
      return <BaseRelationButton { ...this.props} />;
    }
  }
}

RelationButton.propTypes = {
  objectID: PropTypes.number.isRequired,
  onStateChange: PropTypes.func.isRequired,
  relState: PropTypes.string,
  subjectID: PropTypes.number,
  subjectPrivacy: PropTypes.bool,
};

export default RelationButton;
