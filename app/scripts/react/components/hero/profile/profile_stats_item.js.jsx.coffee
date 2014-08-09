###* @jsx React.DOM ###

window.HeroProfileStatsItem = React.createClass

  propTypes:
    count:   React.PropTypes.number.isRequired
    title:   React.PropTypes.string.isRequired
    onClick: React.PropTypes.func

  render: ->
   `<div onClick={ this.handleClick }
         className="hero__stats-item">
      <a title={ this.props.count + ' ' + this.props.title }
         className="hero__stats-link">
        <strong>{ this.props.count }</strong> {this.props.title}
      </a>
    </div>`

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick $(e.currentTarget) if @props.onClick?