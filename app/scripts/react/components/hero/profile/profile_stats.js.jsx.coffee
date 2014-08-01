###* @jsx React.DOM ###

window.HeroProfileStats = React.createClass

  render: ->
   `<div className="hero__stats js-hero-stats">
      <div className="hero__stats-list">
        <div className="hero__stats-item">
          <a className="hero__stats-link js-subscribed-by-toggle" href="#" title="34 подписчиков" data-popup-selector=".js-subscribed-by" data-user-id="37623">
            <strong>34</strong> подписчиков
          </a>
        </div>
        <div className="hero__stats-item">
          <a className="hero__stats-link js-subscribed-to-toggle" href="#" title="33 подписана" data-popup-selector=".js-subscribed-to" data-user-id="37623">
            <strong>33</strong> подписана
          </a>
        </div>
        <div className="hero__stats-item">
          <a className="hero__stats-link " href="#" title="956 в избранном" data-popup-selector="" data-user-id="37623">
            <strong>956</strong> в избранном
          </a>
        </div>
        <div className="hero__stats-item">
          <a className="hero__stats-link " href="#" title="1249 постов" data-popup-selector="" data-user-id="37623">
            <strong>1249</strong> постов
          </a>
        </div>
        <div className="hero__stats-item">
          <a className="hero__stats-link " href="#" title="2841 комментариев" data-popup-selector="" data-user-id="37623">
            <strong>2841</strong> комментариев
          </a>
        </div>
        <div className="hero__stats-item">
          <a className="hero__stats-link " href="#" title="1251 дней на тейсти" data-popup-selector="" data-user-id="37623">
            <strong>1251</strong> дней на тейсти
          </a>
        </div>
      </div>
    </div>`