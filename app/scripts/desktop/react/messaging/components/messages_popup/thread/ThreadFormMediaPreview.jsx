import React, { PropTypes } from 'react';
import ImgFromFile from './ImgFromFile';

class ThreadFormMediaPreview {
  onTouchTap(idx) {
    this.props.onFileRemove(idx);
  }
  render() {
    return (
      <div className="message-form__media-preview">
        {
          this.props.files.map((file, idx) => (
            <div
              className="message-form__media-preview__item"
              key={`file-${idx}-${file.name}-${file.size}`}
            >
              <div
                className="message-form__media-preview__item-remove"
                onTouchTap={this.onTouchTap.bind(this, idx)}
              >
                <i className="icon icon--cross"/>
              </div>
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
  onFileRemove: PropTypes.func.isRequired,
}

export default ThreadFormMediaPreview;
