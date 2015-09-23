import React, { PropTypes } from 'react';
import ImgFromFile from './ImgFromFile';

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
              <ImgFromFile file={file} />
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
