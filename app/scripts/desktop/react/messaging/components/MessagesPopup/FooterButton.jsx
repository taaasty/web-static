import React, { PropTypes } from 'react';
import classNames from 'classnames';

function FooterButton({ disabled, onClick, text }) {
  function handleClick(ev) {
    if (!disabled) {
      onClick(ev);
    }
  }

  const buttonClasses = classNames({
    'button': true,
    'button--green': !disabled,
    'button--grey': disabled,
  });

  return (
    <footer className="messages__footer">
      <span
        className={buttonClasses}
        onClick={handleClick}
      >
        <span className="button__inner">
          <span className="button__text">
            {text}
          </span>
        </span>
      </span>
    </footer>
  );
}

FooterButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default FooterButton;
