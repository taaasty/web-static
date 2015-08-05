import React, { PropTypes } from 'react';

export default class Text {
  static propTypes = {
    value: PropTypes.string.isRequired,
    withHTML: PropTypes.bool
  }
  static defaultProps = {
    withHTML: false
  }
  render() {
    if (this.props.withHTML) {
      return <span dangerouslySetInnerHTML={{__html: this.props.value}} />;
    } else {
      return <span>{this.props.value}</span>;
    }
  }
}