import React, { Component, PropTypes } from 'react';
import * as constants from './constants';

import DumbRelationButton from './DumbRelationButton';

export default class BaseRelationButton extends Component {
  static propTypes = {
    objectID: PropTypes.number.isRequired,
    onStateChange: PropTypes.func.isRequired,
    relState: PropTypes.string,
    subjectID: PropTypes.number,
    subjectPrivacy: PropTypes.bool,
  }
  state = {
    buttonState: constants.BUTTON_SHOW_STATE,
  }
  componentWillUnmount() {
    if (this.errorTimeout) window.clearTimeout(this.errorTimeout);
  }
  onTouchTap() {
  }
  isActive() {
    return false;
  }
  render() {
    return (
      <DumbRelationButton
        active={this.isActive()}
        buttonState={this.state.buttonState}
        onTouchTap={this.onTouchTap.bind(this)}
        relState={this.props.relState}
        subjectPrivacy={this.props.subjectPrivacy}
      />
    );
  }
}
