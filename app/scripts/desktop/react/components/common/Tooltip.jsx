/*global $ */
import React, { findDOMNode, PropTypes } from 'react';

class Tooltip {
  componentDidMount() {
    $(findDOMNode(this)).tooltip({
      container: this.props.container,
      placement: this.props.placement,
    });
  }
  componentWillUnmount() {
    $(findDOMNode(this)).tooltip('destroy');
  }
  render() {
    return (
      <span title={this.props.title}>
        {this.props.children}
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
