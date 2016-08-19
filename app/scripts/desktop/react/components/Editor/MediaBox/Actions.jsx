/*global i18n */
import React, { PropTypes } from 'react';

function EditorMediaBoxActions({ onDelete }) {
  return (
    <div className="media-box__actions">
      <div
        className="media-box__action media-box__action--delete"
        onClick={onDelete}
        title={i18n.t('editor_mediabox_delete')}
      >
        <span className="icon icon--cross" />
      </div>
    </div>
  );
}

EditorMediaBoxActions.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default EditorMediaBoxActions;
