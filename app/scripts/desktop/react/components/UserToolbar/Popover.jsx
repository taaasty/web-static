import React, { Component, PropTypes } from 'react';

export function closest(el, target) {
  while (target.parentNode) {
    if (el === target) {
      return true;
    }

    target = target.parentNode;
  }

  return false;
}

class Popover extends Component {
  componentWillMount() {
    this.clickHandler = this.handleClick.bind(this);
    document.addEventListener('click', this.clickHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler);
  }
  handleClick(ev) {
    if (!closest(this.refs.container, ev.target)) {
      this.props.hide();
    }
  }
  handleInnerClick(ev) {
    ev.stopPropagation();
  }
  render() {
    return (
      <div onClick={this.handleInnerClick} ref="container">
        {this.props.children}
      </div>
    );
  }
}

Popover.propTypes = {
  hide: PropTypes.func.isRequired,
};

export default Popover;
