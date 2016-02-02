import React, { PropTypes } from 'react';

export default class RelativePopupHeader {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hasActivities: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div className="popup__header">
        <div className="popup__headbox">
          <h3 className="popup__title">{this.props.title}</h3>
        </div>
        {this.renderSpinner(this.props.hasActivities)}
        <div className="popup__close" onClick={this.props.onClose}>
          <div className="icon icon--cross" />
        </div>
      </div>
    );
  }
  renderSpinner(hasActivities) {
    if (hasActivities) {
      return (
        <div className="popup__loader">
          <Spinner size={8} />
        </div>
      );
    }
  }
}
