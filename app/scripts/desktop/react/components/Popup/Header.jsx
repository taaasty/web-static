import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from './Spinner';

function Header({ hasActivities, isDraggable, onClickClose, title }) {
  const headBoxClasses = classNames({
    'popup__headbox': true,
    'cursor--move': isDraggable,
  });

  return (
    <div className="popup__header">
      <div className={headBoxClasses}>
        <h3 className="popup__title">
          {title}
        </h3>
      </div>
      <Spinner hasActivities={hasActivities} />
      <div className="popup__close" onClick={onClickClose}>
        <div className="icon icon--cross" />
      </div>
    </div>
  );
}

Header.displayName = 'Header';

Header.propTypes = {
  hasActivities: PropTypes.bool,
  isDraggable: PropTypes.bool,
  onClickClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  hasActivities: false,
  isDraggable: false,
};

export default Header;
