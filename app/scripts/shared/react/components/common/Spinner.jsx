import React, { PropTypes } from 'react';

/** 
Известные размеры:
 - 8x8
 - 14x14
 - 24x24
 - 30x30
 - 70x70
*/

const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 8,
};

class Spinner {
  getSize(size) {
    return `${size}x${size}`;
  }
  render() {
    return (
      <span className={`spinner spinner--${this.getSize(this.props.size)}`}>
        <span className="spinner__icon" />
      </span>
    );
  }
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
