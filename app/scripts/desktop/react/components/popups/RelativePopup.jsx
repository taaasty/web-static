import React, { PropTypes, findDOMNode } from 'react';
import Portal from 'react-portal';
import Tether from 'tether';
import classNames from 'classnames';
import RelativePopupHeader from './RelativePopupHeader';

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

class RelativePopup {
  static propTypes = {
    title: PropTypes.string.isRequired,
    targetRef: PropTypes.any,
    className: PropTypes.string,
    offset: PropTypes.string,
    hasActivities: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  }
  static defaultProps = {
    closeOnOutsideClick: true
  }
  constructor() {
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
  }
  componentDidMount() {
    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mousedown', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
    this.justifyPopup(findDOMNode(this), findDOMNode(this.props.targetRef));
  }
  componentWillUnmount() {
    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mousedown', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }
    this.tether.destroy();
  }
  render() {
    return (
      <div className={classNames('popup', this.props.className)}>
        <div className="popup__arrow popup__arrow--down" />
        <RelativePopupHeader {...this.props} />
        <div className="popup__body">
          {this.props.children}
        </div>
      </div>
    );
  }
  justifyPopup(element, target) {
    // TODO: make some options via props
    this.tether = new Tether({
      element: element,
      target: target,
      attachment: 'bottom center',
      targetAttachment: 'top center',
      offset: '10px 0'
    });
  }
  handleOutsideMouseClick(e) {
    if (isNodeInRoot(e.target, findDOMNode(this))) { return; }
    if (isNodeInRoot(e.target, findDOMNode(this.props.targetRef))) { return; }
    e.stopPropagation();
    this.props.onClose();
  }
}

export default class RelativePopupContainer {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Portal {...this.props}>
        <RelativePopup {...this.props} />
      </Portal>
    );
  }
}