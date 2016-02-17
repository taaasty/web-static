/*global $, ReactUnmountMixin, ReactPositionsMixin, Mousetrap */
import React, { PropTypes, createClass } from 'react';
import classNames from 'classnames';
import Header from './Header';

const NO_TRANSITION_CLASS = 'no--transition';

const Popup = createClass({
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]),
    className: PropTypes.string,
    colorScheme: PropTypes.oneOf([ 'dark', 'light' ]),
    hasActivities: PropTypes.bool,
    isDraggable: PropTypes.bool,
    onClose: PropTypes.func,
    position: PropTypes.object,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
  },
  mixins: [ ReactUnmountMixin, ReactPositionsMixin ],

  getDefaultProps() {
    return {
      hasActivities: false,
      isDark: false,
      isDraggable: false,
      isLight: false,
    };
  },

  componentDidMount() {
    if (this.props.isDraggable) {
      this.makeDraggable();
    }

    Mousetrap.bind('esc', this.close);
  },


  componentWillUnmount() {
    Mousetrap.unbind('esc', this.close);
  },

  makeDraggable() {
    const $popupNode = $(this.refs.container);
    const headboxNode = this.refs.header;

    $popupNode.draggable({
      handle: headboxNode,
      drag() {
        $popupNode.addClass(NO_TRANSITION_CLASS);
      },
      stop: (event, ui) => {
        this.checkPosition();
        this.savePosition(ui.position);
        $popupNode.removeClass(NO_TRANSITION_CLASS);
      },
    });
  },

  close() {
    this.props.onClose ? this.props.onClose() : this.unmount();
  },
  
  handleClick() {
    const popups = [].slice.call(document.querySelectorAll('.popup'));
    const currentNode = this.refs.container;

    Object.keys(popups).forEach((key) => {
      const node = popups[key];

      if (node === currentNode) {
        currentNode.classList.add('front-layer');
        currentNode.classList.remove('back-layer');
      } else {
        node.classList.add('back-layer');
        node.classList.remove('front-layer');
      }
    });
  },

  render() {
    const { children, className, colorScheme, hasActivities,
            isDraggable, title } = this.props;
    const popupClasses = classNames({
      'popup': true,
      'popup--center': true,
      [className]: true,
      'popup--dark': colorScheme === 'dark',
      'popup--light': colorScheme === 'light',
    });

    return (
      <div
        className={popupClasses}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
        ref="container"
        style={this.initialPositionStyle()}
      >
        <Header
          hasActivities={hasActivities}
          isDraggable= {isDraggable}
          onClickClose={this.close}
          ref="header"
          title={title}
        />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  },
});

export default Popup;
