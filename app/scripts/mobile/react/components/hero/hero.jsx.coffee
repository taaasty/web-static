###* @jsx React.DOM ###

Hero = React.createClass

  render: ->
   `<div className="hero" style={{ 'background-image': 'url(../images/bg.jpg)' }}>
      <div className="hero__close">
        <i className="icon icon--cross" />
      </div>
      <div className="hero__overlay" />
      <div className="hero__gradient" />
      <div className="hero__content">
        <div className="hero__avatar">
          <span className="follow-status">
            <i className="follow-status__icon" />
          </span>
          <span className="avatar" style={{ 'background-color': '#eb4656', 'color': '#fff' }}>
            <span className="avatar__text">8</span>
          </span>
        </div>
        <div className="hero__head">
          <div className="hero__title">
            <span>88mm</span>
          </div>
          <div className="hero__text">
            <span>
              sun-makes-my-day sun-makes-my-day sun-makes-my-day sun-makes-my-day sun-makes-my-day sun-makes-my-day
            </span>
          </div>
        </div>
        <div className="hero__actions">
          <button className="follow-button">
            Подписаться
          </button>
          <button className="profile-settings-button">
            <i className="icon icon--cogwheel" />
          </button>
          <button className="write-message-button">
            <i className="icon icon--letter" />
          </button>
          <div className="hero__user-actions">
            <button className="action-menu-button">
              <i className="icon icon--dots" />
            </button>
            <div className="hero__dropdown-popup __top">
              <ul className="hero__dropdown-popup-list">
                <li className="hero__dropdown-popup-item">
                  <a className="hero__dropdown-popup-link" href="#">
                    <i className="icon icon--not-allowed" />
                    <span>Заблокировать</span>
                  </a>
                </li>
                <li className="hero__dropdown-popup-item">
                  <a className="hero__dropdown-popup-link" href="#">
                    <i className="icon icon--exclamation-mark" />
                    <span>Пожаловаться</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__stats">
        <div className="hero__stats-list">
          <div className="hero__stats-item">
            <a className="hero__stats-link" href="#" title="356 записей">
              <strong className="hero__stats-value">356</strong> <span className="hero__stats-label">записей</span>
            </a>
          </div>
          <div className="hero__stats-item hero__stats-item-handler">
            <strong className="hero__stats-value">45</strong> <span className="hero__stats-label">подписан</span>
          </div>
          <div className="hero__stats-item hero__stats-item-handler">
            <strong className="hero__stats-value">356</strong> <span className="hero__stats-label">подписчиков</span>
          </div>
          <div className="hero__stats-item">
            <strong className="hero__stats-value">12</strong> <span className="hero__stats-label">дней тут</span>
          </div>
        </div>
      </div>
    </div>`

module.exports = Hero