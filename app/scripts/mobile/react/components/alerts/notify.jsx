import React, { Component, PropTypes } from 'react';

const TYPE = 'success';
const TIMEOUT = 3000;

export default class Notify extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    timeout: PropTypes.number,
    onClose: PropTypes.func.isRequired,
  };
  defaultProps = {
    type: TYPE,
    timeout: TIMEOUT,
  };
  componentDidMount() {
    this.timeout = setTimeout(this.props.onClose, this.props.timeout);
  }
  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }
  render() {
    return (
      <div className={'alert alert--' + this.props.type}>
        {this.props.text}
      </div>
    );
  }
}
