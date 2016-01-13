/*global $ */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class Tooltip extends Component {
  componentDidMount() {
    const { container, placement } = this.props;

    $(findDOMNode(this)).tooltip({ container, placement });
  }
  componentWillUnmount() {
    $(findDOMNode(this)).tooltip('destroy');
  }
  render() {
    const { children, title } = this.props;

    return (
      <span title={title}>
        {children}
      </span>
    );
  }
}

Tooltip.propTypes = {
  container: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  container: 'body',
  placement: 'top',
};

export default Tooltip;
