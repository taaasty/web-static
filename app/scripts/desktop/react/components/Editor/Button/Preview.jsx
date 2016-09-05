/*global i18n */
import React, { PropTypes } from 'react';

function EditorPreviewButton({ onClick }) {
  return (
    <button
      className="button button--grey"
      onClick={onClick}
    >
      <span className="button__text">
        {i18n.t('editor_preview_button')}
      </span>
    </button>
  );
}

EditorPreviewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditorPreviewButton;
