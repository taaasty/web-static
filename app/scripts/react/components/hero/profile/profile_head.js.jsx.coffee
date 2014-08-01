###* @jsx React.DOM ###

window.HeroProfileHead = React.createClass

  render: ->
   `<div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title js-hero-open js-hero-title">
        <span><a href="http://taaasty.ru/@lazy-cat">lazy-cat</a></span>
      </div>
      <div className="hero__text js-hero-text">
        <span></span>
      </div>
    </div>`