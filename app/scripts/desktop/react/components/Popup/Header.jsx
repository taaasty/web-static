import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from './Spinner';

class Header extends Component {
  render() {
    const { draggable, hasActivities, onClose, title } = this.props;
    const headerClasses = classNames({
      'popup__header': true,
      'cursor--move': draggable,
    });

    return (
      <div className={headerClasses}>
        <div className="popup__headbox">
          <h3 className="popup__title">
            {title}
          </h3>
        </div>
        {hasActivities && <Spinner />}
        <div className="popup__close" onClick={onClose}>
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  draggable: PropTypes.bool,
  hasActivities: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
