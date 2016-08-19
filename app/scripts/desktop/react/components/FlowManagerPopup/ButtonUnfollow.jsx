import React, { PropTypes } from 'react';

function ButtonUnfollow({ onClick }) {
  return (
    <button
      className="button button--small button--outline-light-white button--icon"
      onTouchTap={onClick}
    >
      <i className="icon icon--cross" />
    </button>
  );
}

ButtonUnfollow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonUnfollow;
