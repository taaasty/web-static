import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

function EditorLayout({ backUrl, children, loading }) {
  function handleClick() {
    return backUrl
      ? browserHistory.push({ pathname: backUrl })
      : browserHistory.goBack();
  }

  return (
    <div>
      {!loading && <a className="back-button" onClick={handleClick} />}
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
  loading: PropTypes.bool.isRequired,
};

export default EditorLayout;
