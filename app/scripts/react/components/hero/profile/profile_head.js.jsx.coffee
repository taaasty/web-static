###* @jsx React.DOM ###

window.HeroProfileHead = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
   `<div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title">
        <span><a href={ this.props.user.tlog_url }>{ this.props.user.name }</a></span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: this.props.user.title }} />
      </div>
    </div>`
