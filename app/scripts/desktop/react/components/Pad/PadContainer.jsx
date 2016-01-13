import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Pad from './Pad';

function closest(el, target) {
  while (target.parentNode) {
    if (target === el) return true;
    target = target.parentNode;
  }
  return false;
}

let PadContainer = createClass({
  propTypes: {
    actSelector: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    placement: PropTypes.string,
  },

  getDefaultProps() {
    return {
      placement: 'left'
    };
  },

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick, false);
    document.addEventListener('scroll', this.onDocumentScroll, false);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
    document.removeEventListener('scroll', this.onDocumentScroll, false);
  },

  render() {
    return <Pad {...this.props} />;
  },

  onDocumentClick(e) {
    let isClickInside = closest(findDOMNode(this), e.target);
    if (!isClickInside) this.props.onClose();
  },

  onDocumentScroll() {
    this.props.onClose();
  }
 });

export default PadContainer;
