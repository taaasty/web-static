import React, { PropTypes } from 'react';

class ThreadFormMediaPreview {
  render() {
    return (
      <div className="message-form__media-preview">
        {
          this.props.files.map((file, idx) => (
            <div
              className="message-form__media-preview__item"
              key={`file-${idx}`}
            >
              {`name: ${file.name} (size: ${file.size} bytes)`}
            </div>
          ))
        }
      </div>
    );
  }
}

ThreadFormMediaPreview.propTypes = {
  files: PropTypes.array.isRequired,
}

export default ThreadFormMediaPreview;
