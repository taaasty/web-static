/*global $ */
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import managePositions from '../../../../shared/react/components/higherOrder/managePositions';
import Header from './Header';

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

const _Popup = createClass({
  propTypes: {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onPositionChange: PropTypes.func.isRequired,
    position: PropTypes.object.isRequired,
    showSpinner: PropTypes.bool,
    title: PropTypes.string.isRequired,
  },

  componentDidMount() {
    if (this.props.draggable) {
      this.makeDraggable();
    }
  },

  componentWillReceiveProps(nextProps) {
    // FIXME: Почему-то стили которые указаны в style не применяются при перерендере
    // Устанавливаем их принудительно при обновлении
    $(this.refs.container).css(nextProps.position);
  },

  makeDraggable() {
    const $popup = $(this.refs.container);
    const $header = $(findDOMNode(this.refs.header));

    $popup.draggable({
      handle: $header,
      drag: () => $popup.addClass('no--transition'),
      stop: (event, ui) => {
        this.props.onPositionChange(ui.position);
        $popup.removeClass('no--transition');
      },
    });
  },

  handleClick() {
    const popups = [].slice.call(document.querySelectorAll('.popup'));
    const currentNode = this.refs.container;

    Object.keys(popups).forEach((key) => {
      const node = popups[key];

      if (node == currentNode) {
        node.classList.add('front-layer');
        node.classList.remove('back-layer');
      } else {
        node.classList.add('back-layer');
        node.classList.remove('front-layer');
      }
    });
  },

  handleOutsideMouseClick(e) {
    if (isNodeInRoot(e.target, findDOMNode(this))) {
      return;
    }

    if (isNodeInRoot(e.target, findDOMNode(this.props.targetRef))) { return; }
    e.stopPropagation();
    this.props.onClose();
  },

  render() {
    const { className, children, draggable, onClose, position, showSpinner, title } = this.props;
    const popupClasses = classNames('popup', className);

    return (
      <div
        className={popupClasses}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
        ref="container"
        style={position}
      >
        <Header
          draggable={draggable}
          onClose={onClose}
          ref="header"
          showSpinner={showSpinner}
          title={title}
        />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  },
});

const Popup = managePositions(_Popup);

export default Popup;
