import React, { PropTypes } from 'react';

class ThreadFormUploadButton {
  onChange(ev) {
    this.props.onChange(ev);
    ev.target.value = null;
  }
  render() {
    return (
      <div className="message-form__upload-button-container">
        <div className="message-form__upload-button">
          <i className="icon icon--image-circle" />
          <input
            accept="image/png,image/jpeg,image/gif"
            className="message-form__upload-input"
            multiple={true}
            onChange={this.onChange.bind(this)}
            ref="files"
            size="28"
            type="file"
          />
        </div>
      </div>
    );
  }
}

ThreadFormUploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default ThreadFormUploadButton;
