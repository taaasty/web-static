import * as constants from './constants';
import RelationshipActionCreators from '../../../actions/Relationship';

import BaseRelationButton from './BaseRelationButton';

export default class FollowButton extends BaseRelationButton {
  onTouchTap() {
    const { objectID, subjectID } = this.props;

    this.setState({ buttonState: constants.BUTTON_PROCESS_STATE });
    RelationshipActionCreators.follow(objectID, subjectID)
      .then((relationship) => {
        this.setState({ buttonState: constants.BUTTON_SHOW_STATE });
        this.props.onStateChange(relationship.state);
      })
      .fail(() => {
        this.setState({ currentState: constants.BUTTON_ERROR_STATE });
        this.errorTimeout = window.setTimeout(() => {
          this.setState({ currentState: constants.BUTTON_SHOW_STATE });
        }, 1000);
      });
  }
}
