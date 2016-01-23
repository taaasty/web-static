/*global $ */
import React, { Component, PropTypes } from 'react';

class Tooltip extends Component {
  componentDidMount() {
    const { container, placement } = this.props;

    $(this.refs.tooltip).tooltip({ container, placement });
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
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  container: 'body',
  placement: 'top',
};

export default Tooltip;
