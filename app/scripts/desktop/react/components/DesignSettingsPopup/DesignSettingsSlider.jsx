/*global setTimeout */
import React, { Component ,PropTypes } from 'react';
import classNames from 'classnames';

class DesignSettingsSlider extends Component {
  state = {
    init: false,
    leftLimit: true,
    rightLimit: false,
    leftOffset: 0,
  };
  componentDidMount() {
    setTimeout(() => requestAnimationFrame(() => this.setState({ init: true })));
  }
  slidePrev() {
    const rightLimit = false;
    const mainWidth = this.refs.main.offsetWidth;
    const shift = mainWidth - 40;

    let leftLimit = this.state.leftLimit;
    let leftOffset = Math.abs(this.state.leftOffset);

    if (leftOffset == 0) {
      return;
    }

    if (leftOffset - shift <= 0) {
      leftLimit = true;
      leftOffset = 0;
    } else {
      leftOffset = leftOffset - shift;
    }

    this.setState({ leftLimit, rightLimit, leftOffset: leftOffset * -1 });
  }
  slideNext() {
    const leftLimit = false;
    const listWidth = this.refs.list.offsetWidth;
    const mainWidth = this.refs.main.offsetWidth;
    const shift = mainWidth - 40;

    let rightLimit = this.state.rightLimit;
    let leftOffset = Math.abs(this.state.leftOffset);

    if (leftOffset + shift >= listWidth) {
      return;
    }

    if (leftOffset + shift >= listWidth - mainWidth) {
      rightLimit = true;
      leftOffset = listWidth - mainWidth;
    } else {
      leftOffset = leftOffset + shift;
    }

    this.setState({ leftLimit, rightLimit, leftOffset: leftOffset * -1 });
  }
  renderButtons() {
    return (this.state.init && this.refs.list.offsetWidth > this.refs.main.offsetWidth) && [
      <div
        className="slider__btn slider__btn--left"
        key="prev"
        onClick={this.slidePrev.bind(this)}
      />,
      <div
        className="slider__btn slider__btn--right"
        key="next"
        onClick={this.slideNext.bind(this)}
      />,
    ];
  }
  render() {
    const { children, className } = this.props;
    const { init, leftLimit, leftOffset, rightLimit } = this.state;
    const sliderClasses = classNames('slider', {
      '__inited': init,
      '__leftlimit': leftLimit,
      '__rightlimit': rightLimit,
    }, className);

    return (
      <div className={sliderClasses}>
        <div className="slider__main" ref="main">
          <div
            className="slider__list"
            ref="list"
            style={{ transform: `translateX(${leftOffset}px)` }}
          >
            <div className="slider__table">
              <div className="slider__table-cell">
                {children}
              </div>
            </div>
          </div>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

DesignSettingsSlider.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default DesignSettingsSlider;
