import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from './Spinner';

class Header extends Component {
  render() {
    const { draggable, onClose, showSpinner, title } = this.props;
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
        {!!showSpinner && <Spinner />}
        <div className="popup__close" onClick={onClose}>
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  draggable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
};

Header.defaultProps = {
  draggable: false,
  showSpinner: false,
  title: '--',
};

export default Header;
