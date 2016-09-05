/*global i18n */
import React, { PropTypes } from 'react';
import MediaBox from '../MediaBox';

function EditorEmbedLoading({ embedUrl }) {
  return (
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <span>
            {embedUrl}
          </span>
          <br />
          <span>
            {i18n.t('editor_video_mediabox_loading')}
          </span>
        </div>
      </div>
    </MediaBox>
  );
}

EditorEmbedLoading.propTypes = {
  embedUrl: PropTypes.string.isRequired,
};

export default EditorEmbedLoading;
