import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

function EditorLayout({ backUrl, children, isSaving }) {
  function handleClick() {
    return backUrl
      ? browserHistory.push({ pathname: backUrl })
      : browserHistory.goBack();
  }

  return (
    <div>
      {!isSaving && <a className="back-button" onClick={handleClick} />}
      {children}
    </div>
  );
}

EditorLayout.propTypes = {
  backUrl: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  isSaving: PropTypes.bool.isRequired,
};

export default EditorLayout;
