###* @jsx React.DOM ###

window.HeroProfileStatsItem = React.createClass

  propTypes:
    count:   React.PropTypes.number.isRequired
    title:   React.PropTypes.string.isRequired
    href:    React.PropTypes.string
    onClick: React.PropTypes.func

  render: ->
    statsItemClasses = React.addons.classSet {
      'hero__stats-item': true
      'hero__stats-item-handler': @props.onClick?
    }

    if @props.href?
      link = `<a href={ this.props.href }
                 title={ this.props.count + ' ' + this.props.title }
                 className="hero__stats-link">
                <strong>{ this.props.count }</strong>
                {this.props.title}
              </a>`
    else
      link = `<span>
                <strong>{ this.props.count }</strong>
                {this.props.title}
              </span>`

    return `<div onClick={ this.handleClick }
                 className={ statsItemClasses }>
              { link }
            </div>`

  handleClick: (e) ->
    if @props.onClick?
      e.preventDefault()
      @props.onClick $(e.currentTarget)