###* @jsx React.DOM ###

window.HeroProfileStatsItem = React.createClass

  propTypes:
    count:   React.PropTypes.number.isRequired
    title:   React.PropTypes.string.isRequired
    onClick: React.PropTypes.func

  render: ->
   `<div className="hero__stats-item">
      <a title={ this.props.count + ' ' + this.props.title }
         onClick={ this.props.onClick } 
         className="hero__stats-link">
        <strong>{ this.props.count }</strong> {this.props.title}
      </a>
    </div>`