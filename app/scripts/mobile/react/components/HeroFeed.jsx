import React, { PropTypes } from 'react';

function HeroFeed({ title }) {
  return (
    <div className="hero hero--static">
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__head">
          <div className="hero__title">
            <span>
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

HeroFeed.displayName = 'HeroFeed';

HeroFeed.propTypes = {
  title: PropTypes.string.isRequired,
};
  
export default HeroFeed;
