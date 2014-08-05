###* @jsx React.DOM ###

window.HeroProfileHead = React.createClass

  propTypes:
    href: React.PropTypes.string.isRequired

  render: ->
   `<div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title">
        <span><a href={ this.props.href }>lazy-cat</a></span>
      </div>
      <div className="hero__text js-hero-text">
        <span></span>
      </div>
    </div>`