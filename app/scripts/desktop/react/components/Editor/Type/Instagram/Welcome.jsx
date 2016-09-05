/*global i18n */
import React, { PropTypes } from 'react';
import MediaBox from '../../MediaBox';

function EditorTypeInstagramWelcome({ startInsert }) {
  function handleClickInsert(ev) {
    ev.preventDefault()
    startInsert();
  }

  return (
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a
            onClick={handleClickInsert}
            title={i18n.t('editor_welcome_instagram_insert')}
          >
            {i18n.t('editor_welcome_instagram_insert')}
          </a>
          <span>
            {' '}
            {i18n.t('editor_welcome_instagram_link')}
          </span>
        </div>
      </div>
    </MediaBox>
  )
}

EditorTypeInstagramWelcome.propTypes = {
  startInsert: PropTypes.func,
};

export default EditorTypeInstagramWelcome;
