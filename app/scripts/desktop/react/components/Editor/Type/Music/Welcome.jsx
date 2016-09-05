/*global i18n */
import React, { PropTypes } from 'react';
import MediaBox from '../../MediaBox';

function EditorTypeMusicWelcome({ startInsert }) {
  function handleClickInsert(ev) {
    ev.preventDefault();
    startInsert();
  }

  return (
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a
            onClick={handleClickInsert}
            title={i18n.t('editor_welcome_music_insert')}
          >
            {i18n.t('editor_welcome_music_insert')}
          </a>
          <span>
            {' '}
            {i18n.t('editor_welcome_music_supported_services')}
          </span>
        </div>
      </div>
    </MediaBox>
  );
}

EditorTypeMusicWelcome.propTypes = {
  startInsert: PropTypes.func,
};

export default EditorTypeMusicWelcome;
