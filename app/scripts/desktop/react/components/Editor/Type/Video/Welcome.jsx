/*global i18n */
import React, { PropTypes } from 'react';
import MediaBox from '../../MediaBox';

function EditorTypeVideoWelcome({ startInsert }) {
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
            title={i18n.t('editor_welcome_video_insert')}
          >
            {i18n.t('editor_welcome_video_insert')}
          </a>
          <span>
            {' '}
            {i18n.t('editor_welcome_video_link')}
          </span>
          <br />
          <span>
            {i18n.t('editor_welcome_video_supported_services')}
          </span>
        </div>
      </div>
    </MediaBox>
  );
}

EditorTypeVideoWelcome.propTypes = {
  startInsert: PropTypes.func,
};

export default EditorTypeVideoWelcome;
