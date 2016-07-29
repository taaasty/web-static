/*global i18n */
import React, { PropTypes } from 'react';

function EditorTypeImageLoadingUrl({ imageUrl }) {
  return (
    <div className="media-box__info">
      <div className="media-box__text">
        <span>{imageUrl}</span>
        <br />
        <span>
          {i18n.t('editor_image_mediabox_loading')}
        </span>
      </div>
    </div>
  );
}

EditorTypeImageLoadingUrl.propTypes = {
  imageUrl: PropTypes.string.isRequired,
}

EditorTypeImageLoadingUrl.defaultProps = {
  imageUrl: 'https://drscdn.500px.org/photo/103544339/m%3D1170/c1aa9785dac814298957160c6255821f',
};

export default EditorTypeImageLoadingUrl;
