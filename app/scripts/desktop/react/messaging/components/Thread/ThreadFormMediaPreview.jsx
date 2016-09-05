import React, { PropTypes } from 'react';
import ImgFromFile from './ImgFromFile';

function ThreadFormMediaPreview(props) {
  const {
    files,
    onFileRemove,
  } = props;

  return (
    <div className="message-form__media-preview">
      {
        files.map((file, idx) => (
          <div
            className="message-form__media-preview__item"
            key={`file-${idx}-${file.name}-${file.size}`}
          >
            <div
              className="message-form__media-preview__item-remove"
              onTouchTap={onFileRemove.bind(null, file)}
            >
              <i className="icon icon--cross" />
            </div>
            <ImgFromFile file={file} />
          </div>
        )).valueSeq()
      }
    </div>
  );
}

ThreadFormMediaPreview.propTypes = {
  files: PropTypes.object.isRequired,
  onFileRemove: PropTypes.func.isRequired,
};

export default ThreadFormMediaPreview;
