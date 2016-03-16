import React, { Component, PropTypes } from 'react';

class Hero extends Component {
  renderActions() {
    if (this.props.actions != null) {
      return (
        <div className="hero__actions hero__actions--visible">
          {this.props.actions}
        </div>
      );
    }

    return null;
  }
  render() {
    const { backgroundUrl, isFetching, text, title } = this.props;
    const heroStyles = {
      backgroundImage: `url(${backgroundUrl})`,
    };

    return (
      <div className="hero hero--cover" style={heroStyles}>
        <div className="hero__overlay" />
        <div className="hero__box">
          <div className="hero__head">
            <div className="hero__title">
              <span>{title}</span>
            </div>
          </div>
          <div className="hero__text">
            <span>{text}</span>
          </div>
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.element, PropTypes.arrayOf(PropTypes.element),
  ]),
  backgroundUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.node.isRequired,
};

export default Hero;
