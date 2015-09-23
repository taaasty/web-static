import React, { PropTypes } from 'react';
import ThreadFormMediaPreviewImage from './ThreadFormMediaPreviewImage';

class ThreadFormMediaPreview {
  render() {
    return (
      <div className="message-form__media-preview">
        {
          this.props.files.map((file, idx) => (
            <div
              className="message-form__media-preview__item"
              key={`file-${idx}-${file.name}-${file.size}`}
            >
              <ThreadFormMediaPreviewImage image={file} />
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
