import React, { PropTypes } from 'react';
import MediaBox from '../MediaBox';
import MediaBoxActions from '../MediaBox/Actions';

function EditorEmbedLoaded({ embedHtml, isFetchingEmbed, onDelete }) {
  return (
    <MediaBox entryType="video" state="loaded">
      <div
        className="media-box__display"
        dangerouslySetInnerHTML={{__html: embedHtml || ''}} 
      />
    {!isFetchingEmbed && (
      <MediaBoxActions onDelete={onDelete} />
    )}
    </MediaBox>
  );
}

EditorEmbedLoaded.propTypes = {
  embedHtml: PropTypes.string.isRequired,
  isFetchingEmbed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditorEmbedLoaded;
