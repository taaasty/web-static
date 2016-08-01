import React, { PropTypes } from 'react';
import MediaBox from '../MediaBox';
import MediaBoxActions from '../MediaBox/Actions';

function EditorEmbedUrlInsert({ onCancel, onInsert }) {
  function handlePaste(ev) {
    onInsert(ev.clipboardData.getData('text'));
  }

  return (
    <MediaBox entryType="video" state="insert">
      <label
        className="media-box__form"
        htmlFor="media-box-video-url"
      >
        <input
          autoFocus
          className="media-box__form-input"
          id="media-box-video-url"
          onBlur={onCancel}
          onPaste={handlePaste}
          type="url"
        />
      </label>
      <MediaBoxActions onDelete={onCancel} />
    </MediaBox>
  );
}

EditorEmbedUrlInsert.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
};

export default EditorEmbedUrlInsert;
