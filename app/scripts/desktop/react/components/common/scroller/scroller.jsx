/*global $ */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Scroller extends Component {
  componentDidMount() {
    this.wheelHandler = this.handleMouseWheel.bind(this);
    $(this.refs.scrollerPane).on('DOMMouseScroll mousewheel', this.wheelHandler);

    if (this.props.customScroller) {
      this.scroller = $(this.refs.scroller).baron({
        scroller: '.scroller__pane',
        bar: '.scroller__bar',
        track: '.scroller__track',
        barOnCls: 'scroller--tracked',
        pause: 0,
      });
    }
  }
  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.update();
    }
  }
  componentWillUnmount() {
    $(this.refs.scrollerPane).off('DOMMouseScroll mousewheel', this.wheelHandler);

    if (this.scroller) {
      this.scroller.dispose();
      this.scroller = null;
    }
  }
  handleMouseWheel(ev) {
    const el = ev.currentTarget;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const height = $(el).height();
    const delta = (ev.type === 'DOMMouseScroll' ? ev.originalEvent.detail * -40 : ev.originalEvent.wheelDelta);
    const up = delta > 0;

    function prevent() {
      ev.stopPropagation();
      ev.preventDefault();
      ev.returnValue = false;
      return false;
    }

    if (!up && -delta > scrollHeight - height - scrollTop) {
      $(el).scrollTop(scrollHeight);
      return prevent();
    } else if (up && delta > scrollTop) {
      $(el).scrollTop(0);
      return prevent();
    }
  }
  handleScroll(ev) {
    if (this.props.onScroll) {
      this.props.onScroll(ev);
    }
  }
  render() {
    const { children, className } = this.props;
    const scrollerClasses = classNames('scroller', 'scroller--dark', className);

    return (
        <div
          className={scrollerClasses}
          onScroll={this.handleScroll.bind(this)}
          ref="scroller"
        >
        <div className="scroller__pane" ref="scrollerPane">
          {children}
        </div>
        <div className="scroller__track">
          <div className="scroller__bar" />
        </div>
      </div>
    );
  }
}

Scroller.propTypes = {
  className: PropTypes.string,
  customScroller: PropTypes.bool,
  onScroll: PropTypes.func,
};

Scroller.defaultProps = {
  customScroller: true,
};

export default Scroller;
