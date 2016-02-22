import React, { PropTypes } from 'react';

function FeedPageHeader() {
  const style = { backgroundImage: 'url("http://taaasty.com/assets/bgs/88/5f/120528_original.jpg")' };
  
  return (
    <header className="page-header">
      <div className="hero hero--cover" style={style}>
        <div className="hero__overlay" />
        <div className="hero__box">
          <div className="hero__slide state--current">
            <div className="hero__head">
              <div className="hero__title">
                Подписки
              </div>
            </div>
            <div className="hero__text">
              15 друзей пишут
            </div>
          </div>
        </div>
      </div>
      <div className="site-apps">
        <img
          className="site-apps__device site-apps__device--iphone"
          src="/images/site-apps/device-iphone.png" />
        <img
          className="site-apps__device site-apps__device--android"
          src="/images/site-apps/device-android.png" />
        <div className="site-apps__desc">
          <h5 className="site-apps__title">
            Установите приложение для iOS или Android
          </h5>
          <div className="site-apps__badges">
            <a
              className="site-apps__badge site-apps__badge--apple-store"
              href="https://itunes.apple.com/us/app/tejsti/id944944503?mt=8"
              title="Приложение для iOs"
            >
            </a>
            <a
              className="site-apps__badge site-apps__badge--google-play"
              href="https://play.google.com/store/apps/details?id=ru.taaasty&amp;hl=ru"
              title="Приложение для Android"
            >
            </a>
          </div>
        </div>
      </div>
    </header>    
  );
}

FeedPageHeader.displayName = 'FeedPageHeader';

FeedPageHeader.propTypes = {
};

export default FeedPageHeader;
