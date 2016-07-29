/*global i18n */
import React, { PropTypes } from 'react';
import DropZone from '../../../common/DropZone';

function EditorTypeImageWelcome(props) {
  const {
    onClickInsertState,
    onDragLeave,
    onDragOver,
    onDrop,
    onSelectFiles,
  } = props;

  function handleClick(ev) {
    ev.target.value = null;
  }

  function handleChange(ev) {
    const files = ev.target.files;

    if (files.length) {
      onSelectFiles(files);
    }
  }

  function handleDrop(files) {
    onDrop();

    if (files.length) {
      onSelectFiles(files);
    }
  }

  function handleClickInsert(ev) {
    ev.preventDefault();
    onClickInsertState();
  }

return (
    <DropZone
      global
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div className="media-box__info">
        <div className="media-box__text">
          <span>
            {i18n.t('editor_welcome_move_or')}
          </span>
          <span className="form-upload form-upload--image">
            <span className="form-upload__text">
              {i18n.t('editor_welcome_choose')}
            </span>
            <input
              accept="image/*"
              className="form-upload__input"
              id="image"
              multiple
              onChange={handleChange}
              onClick={handleClick}
              type="file"
            />
          </span>
          <span>
            {i18n.t('editor_welcome_picture_or')}
          </span>
          <br />
          <a
            onClick={handleClickInsert}
            title={i18n.t('editor_welcome_insert')}
          >
            {i18n.t('editor_welcome_insert')}
          </a>
          <span>
            {i18n.t('editor_welcome_link_to_it')}
          </span>
        </div>
      </div>
    </DropZone>
);
}

EditorTypeImageWelcome.propTypes = {
  onClickInsertState: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSelectFiles: PropTypes.func.isRequired,
};

export default EditorTypeImageWelcome;
