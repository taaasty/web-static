/*global i18n */
import React, { PropTypes } from 'react';

function FeedHeader({ bgImage, text, title }) {
  const style = bgImage && { backgroundImage: `url(${bgImage})` };
  
  return (
    <header className="page-header">
      <div className="hero hero--cover" style={style}>
        <div className="hero__overlay" />
        <div className="hero__box">
          <div className="hero__slide state--current">
            <div className="hero__head">
              <div className="hero__title">
                {title}
              </div>
            </div>
            <div className="hero__text">
              {text}
            </div>
          </div>
        </div>
      </div>
      <div className="site-apps">
        <img
          className="site-apps__device site-apps__device--iphone"
          src="/images/site-apps/device-iphone.png"
        />
        <img
          className="site-apps__device site-apps__device--android"
          src="/images/site-apps/device-android.png"
        />
        <div className="site-apps__desc">
          <h5 className="site-apps__title">
            {i18n.t('feed.header.install')}
          </h5>
          <div className="site-apps__badges">
            <a
              className="site-apps__badge site-apps__badge--apple-store"
              href="https://itunes.apple.com/us/app/tejsti/id944944503?mt=8"
              title={i18n.t('feed.header.app_ios')}
            >
            </a>
            <a
              className="site-apps__badge site-apps__badge--google-play"
              href="https://play.google.com/store/apps/details?id=ru.taaasty&amp;hl=ru"
              title={i18n.t('feed.header.app_android')}
            >
            </a>
          </div>
        </div>
      </div>
    </header>    
  );
}

FeedHeader.displayName = 'FeedHeader';

FeedHeader.propTypes = {
  bgImage: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
};

FeedHeader.defaultProps = {
  bgImage: '//taaasty.com/images/hero-cover.jpg',
};

export default FeedHeader;
