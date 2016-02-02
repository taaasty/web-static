import React, { PropTypes } from 'react';

class CloseToolbar {
  componentWillMount() {
    if (window.isMobile()) {
      this.onMouseEnter = () => {};
      this.onMouseLeave = () => {};
    }
  }
  render() {
    return (
      <div className="toolbar toolbar--close" onClick={this.props.onClick}>
        <div className="toolbar__toggle">
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  }
}

CloseToolbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseToolbar;
