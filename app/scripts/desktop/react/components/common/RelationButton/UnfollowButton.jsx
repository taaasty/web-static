import * as constants from './constants';
import RelationshipActionCreators from '../../../actions/Relationship';

import BaseRelationButton from './BaseRelationButton';

export default class UnfollowButton extends BaseRelationButton {
  onTouchTap() {
    const { objectID, subjectID } = this.props;

    this.setState({ buttonState: constants.BUTTON_PROCESS_STATE });
    RelationshipActionCreators.unfollow(objectID, subjectID)
      .then((relationship) => {
        this.setState({ buttonState: constants.BUTTON_SHOW_STATE });
        this.props.onStateChange(relationship.state);
      })
      .fail(() => {
        this.setState({ buttonState: constants.BUTTON_ERROR_STATE });
        this.errorTimeout = window.setTimeout(() => {
          this.setState({ buttonState: constants.BUTTON_SHOW_STATE });
        }, 1000);
      });
  }
  isActive() {
    return this.props.relState === constants.REL_FRIEND_STATE &&
      this.state.buttonState === constants.BUTTON_SHOW_STATE;
  }
}
