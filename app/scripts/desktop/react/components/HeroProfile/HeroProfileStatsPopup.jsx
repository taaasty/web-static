/*global $, PopupHeader, TastyEvents, ReactUnmountMixin, ComponentManipulationsMixin */
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

const MARGIN = 10;
const FADE_DURATION = 300;

const HeroProfileStatsPopup = createClass({
  propTypes: {
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    toggle: PropTypes.object.isRequired,
  },
  mixins: [ 'ReactActivitiesMixin', ReactUnmountMixin, ComponentManipulationsMixin ],

  componentDidMount() {
    this.alignPopup();
    this.open();

    TastyEvents.on(TastyEvents.keys.hero_closed(), this.close);
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
    this.$toggle = this.props.toggle;
    this.$popup.css({
      top: this.getPopupOffset().top,
      left: this.getPopupOffset().left,
    });
  },
  
  open() {
    this.$popup.css('display', 'none').fadeIn(FADE_DURATION);
  },
  
  close() {
    this.safeUpdate(() => this.$popup.fadeOut(FADE_DURATION, this.unmount));
  },

  render() {
    const { children, isDraggable, title } = this.props;

    React.Children.map(children, (context) => (
      context.props.activitiesHandler = this.activitiesHandler
    ));

    return (
      <div className="popup popup--dark">
        <div className="popup__arrow popup__arrow--down" />
        <PopupHeader
          hasActivities={this.hasActivities()}
          isDraggable={isDraggable}
          onClickClose={this.close}
          title={title}
        />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  },
});

export default HeroProfileStatsPopup;
