import React, { PropTypes } from 'react';

class ThreadFormUploadButton {
  render() {
    return (
      <div className="message-form__upload-button-container">
        <div className="message-form__upload-button">
          <i className="icon icon--image-circle">
            <input
              accept="image/png,image/jpeg,image/gif"
              className="message-form__upload-input"
              multiple={true}
              onChange={this.props.onChange}
              size="28"
              type="file"
            />
          </i>
        </div>
      </div>
    );
  }
}

ThreadFormUploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default ThreadFormUploadButton;
