/*global i18n */
import React, { Component, PropTypes } from 'react';

const BODY_HERO_CLASS = 'layout-hero-static';

class HeroFeed extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.document.body.classList.add(BODY_HERO_CLASS);
    }
  }
  render() {
    return (
      <div className="hero hero--static">
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__head">
            <div className="hero__title">
              <span>
                {this.props.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeroFeed.displayName = 'HeroFeed';

HeroFeed.propTypes = {
  title: PropTypes.string.isRequired,
};
  
export default HeroFeed;
