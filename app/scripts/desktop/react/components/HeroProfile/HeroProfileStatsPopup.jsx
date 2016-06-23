/*global $ */
import React, { cloneElement, createClass, Children, PropTypes } from 'react';
import PopupHeader from '../Popup/Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { findDOMNode } from 'react-dom';

const MARGIN = 10;
const FADE_TIMEOUT = 300;

const HeroProfileStatsPopup = createClass({
  propTypes: {
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  },
  mixins: [ 'ReactActivitiesMixin' ],

  componentDidMount() {
    this.alignPopup();
    $(window).one('resize', this.close);
  },
  
  componentDidUpdate() {
    this.alignPopup();
  },

  componentWillUnmount() {
    $(window).off('resize', this.close);
  },
  
  getPopupOffset() {
    const widthPopup = this.$popup.width();
    const heightPopup = this.$popup.height();
    const widthToggle = this.$toggle.outerWidth();
    const offsetTop = this.$toggle.offset().top;
    const offsetLeft = this.$toggle.offset().left;

    return ({
      top: offsetTop - heightPopup - MARGIN,
      left: offsetLeft - (widthPopup - widthToggle) / 2,
    });

  },
  
  alignPopup() {
    this.$popup =  $(findDOMNode(this));
    this.$toggle = this.$popup.parent();
    this.$popup.css({
      top: this.getPopupOffset().top,
      left: this.getPopupOffset().left,
    });
  },
  
  render() {
    const { children, close, title } = this.props;

    const newChildren = Children.map(children, (context) => (
      cloneElement(context, {
        close,
        activitiesHandler: this.activitiesHandler,
      })
    ));

    return (
      <ReactCSSTransitionGroup
        transitionEnterTimeout={FADE_TIMEOUT}
        transitionLeaveTimeout={FADE_TIMEOUT}
        transitionName="hero__stats-popup"
      >
        <div className="popup popup--dark">
          <div className="popup__arrow popup__arrow--down" />
          <PopupHeader
            draggable={false}
            hasActivities={this.hasActivities()}
            onClose={close}
            title={title}
          />
          <div className="popup__body">
            {newChildren}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  },
});

export default HeroProfileStatsPopup;
