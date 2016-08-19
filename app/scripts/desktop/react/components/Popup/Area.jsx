import React, { Component, PropTypes } from 'react';

class Area extends Component {
  componentWillMount() {
    document.body.classList.add('popup-enabled');
  }
  componentWillUnmount() {
    document.body.classList.remove('popup-enabled');
  }
  handleClick(ev) {
    const { onClose } = this.props;

    if (ev.target.classList.contains('popup-container__cell')) {
      ev.preventDefault();
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }
  render() {
    const { children } = this.props;

    return (
      <div className="popup-container">
        <div className="popup-container__main">
          <div className="popup-container__cell" onClick={this.handleClick.bind(this)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Area.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};

export default Area;
