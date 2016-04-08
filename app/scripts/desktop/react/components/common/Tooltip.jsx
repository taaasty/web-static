/*global $ */
import React, { Component, PropTypes } from 'react';

class Tooltip extends Component {
  componentDidMount() {
    const { container, html, placement } = this.props;

    $(this.refs.tooltip).tooltip({ container, html, placement });
  }
  componentWillUnmount() {
    $(this.refs.tooltip).tooltip('destroy');
  }
  render() {
    const { children, title } = this.props;

    return (
      <span ref="tooltip" title={title}>
        {children}
      </span>
    );
  }
}

Tooltip.propTypes = {
  container: PropTypes.string,
  html: PropTypes.bool,
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  container: 'body',
  html: false,
  placement: 'top',
};

export default Tooltip;
