import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

function EditorLayout({ backUrl, children, isFetching }) {
  function handleClick() {
    return backUrl
      ? browserHistory.push({ pathname: backUrl })
      : browserHistory.goBack();
  }

  return (
    <div>
      {!isFetching && <a className="back-button" onClick={handleClick} />}
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
  isFetching: PropTypes.bool.isRequired,
};

export default EditorLayout;
