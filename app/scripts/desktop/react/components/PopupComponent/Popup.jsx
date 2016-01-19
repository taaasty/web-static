/*global $ */
import React, { cloneElement, createClass, Children, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import managePositions from '../../../../shared/react/components/higherOrder/managePositions';
import PopupHeader from './PopupHeader';

let Popup = createClass({
  propTypes: {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onPositionChange: PropTypes.func.isRequired,
    position: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  },
  mixins: ['ReactActivitiesMixin'],

  componentDidMount() {
    if (this.props.draggable) {
      this.makeDraggable();
    }
  },

  componentWillReceiveProps(nextProps) {
    // FIXME: Почему-то стили которые указаны в style не применяются при перерендере
    // Устанавливаем их принудительно при обновлении
    $(findDOMNode(this)).css(nextProps.position);
  },

  makeDraggable() {
    const $popup = $(findDOMNode(this));
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

  handleClick(e) {
    let popups = [].slice.call(document.querySelectorAll('.popup')),
        currentNode = findDOMNode(this);

    Object.keys(popups).forEach((key) => {
      let node = popups[key];

      if (node == currentNode) {
        node.classList.add('front-layer');
        node.classList.remove('back-layer');
      } else {
        node.classList.add('back-layer');
        node.classList.remove('front-layer');
      }
    });
  },

  render() {
    let popupClasses = ['popup', this.props.className].join(' ');
    let children = Children.map(this.props.children, ((child) =>
      cloneElement(child, { activitiesHandler: this.activitiesHandler })
    ));

    return (
      <div
        className={popupClasses}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
        style={this.props.position}
      >
        <PopupHeader
          draggable={this.props.draggable}
          hasActivities={this.hasActivities()}
          onClose={this.props.onClose}
          ref="header"
          title={this.props.title}
        />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  },
});

Popup = managePositions(Popup);

export default Popup;
