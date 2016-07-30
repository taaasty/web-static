import React, { PropTypes } from 'react';
import EditorMediaBoxActions from '../../MediaBox/Actions';

function EditorTypeImageUrlInsert({ onCancel, onInsertImageUrl }) {
  function handlePaste(ev) {
    onInsertImageUrl(ev.clipboardData.getData('text'));
  }

  function handleBlur() {
    onCancel();
  }

  return (
    <label
      className="media-box__form"
      htmlFor="media-box-image-url"
    >
      <input
        autoFocus
        className="media-box__form-input"
        id="media-box-image-url"
        onBlur={handleBlur}
        onPaste={handlePaste}
        type="url"
      />
      <EditorMediaBoxActions onDelete={onCancel} />
    </label>
  );
}

EditorTypeImageUrlInsert.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onInsertImageUrl: PropTypes.func.isRequired,
};

export default EditorTypeImageUrlInsert;
