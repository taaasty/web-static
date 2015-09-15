import * as constants from './constants';
import RelationshipActionCreators from '../../../actions/Relationship';
import BaseRelationButton from './BaseRelationButton';

export default class CancelButton extends BaseRelationButton {
  onTouchTap() {
    const { objectID, subjectID } = this.props;

    this.setState({ buttonState: constants.BUTTON_PROCESS_STATE });
    RelationshipActionCreators.cancel(objectID, subjectID)
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
}
