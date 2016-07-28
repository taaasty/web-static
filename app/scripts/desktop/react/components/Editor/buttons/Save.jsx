/*global i18n */
import React, { PropTypes } from 'react';

function EditorSaveButton(props) {
  const {
    isEntryForCurrentUser,
    isPrivate,
    onClick,
    tag,
  } = props;

  function title() {
    if (isEntryForCurrentUser) {
      return isPrivate ? i18n.t('editor_save_button') : i18n.t('editor_publish_button');
    } else {
      return i18n.t('editor_publish_to_tlog_button', { tlogTag: tag });
    }
  }

  return (
    <button className="button button--green" onClick={onClick}>
      <span className="button__text">
        {title()}
      </span>
    </button>
  );
}

EditorSaveButton.propTypes = {
  isEntryForCurrentUser: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tag: PropTypes.object,
};

export default EditorSaveButton;
