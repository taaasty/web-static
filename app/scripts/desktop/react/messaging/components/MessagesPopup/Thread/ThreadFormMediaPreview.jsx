import React, { PropTypes } from 'react';
import ImgFromFile from './ImgFromFile';

function ThreadFormMediaPreview(props) {
  function onTouchTap(idx) {
    props.onFileRemove(idx);
  }

  return (
    <div className="message-form__media-preview">
      {
        props.files.map((file, idx) => (
          <div
            className="message-form__media-preview__item"
            key={`file-${idx}-${file.name}-${file.size}`}
          >
            <div
              className="message-form__media-preview__item-remove"
              onTouchTap={onTouchTap.bind(null, idx)}
            >
              <i className="icon icon--cross" />
            </div>
            <ImgFromFile file={file} />
          </div>
        ))
      }
    </div>
  );
}

ThreadFormMediaPreview.propTypes = {
  files: PropTypes.array.isRequired,
  onFileRemove: PropTypes.func.isRequired,
}

export default ThreadFormMediaPreview;
