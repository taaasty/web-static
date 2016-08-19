import React, { PropTypes } from 'react';

function EditorMediaBoxProgess({ progress }) {
  const width = Math.max(Math.min(progress, 100), 0);

  return (
    <div className="media-box__loader">
      <div
        className="media-box__loader-fill"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

EditorMediaBoxProgess.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default EditorMediaBoxProgess;
