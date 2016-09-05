import React, { cloneElement, Component, Children, PropTypes } from 'react';
import PopupHeader from '../Popup/Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FADE_TIMEOUT = 300;

class HeroProfileStatsPopup extends Component {
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
        <div className="popup popup--dark popup--hero-stats">
          <div className="popup__arrow popup__arrow--down" />
          <PopupHeader
            draggable={false}
            onClose={close}
            title={title}
          />
          <div className="popup__body">
            {newChildren}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

HeroProfileStatsPopup.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeroProfileStatsPopup;
