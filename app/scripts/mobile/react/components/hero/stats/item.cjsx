cx = require 'react/lib/cx'
{ PropTypes } = React

HeroStatsItem = React.createClass

  propTypes:
    count:   PropTypes.number.isRequired
    title:   PropTypes.string.isRequired
    href:    PropTypes.string
    onClick: PropTypes.func

  render: ->
    itemClasses = cx
      'hero__stats-item': true
      'hero__stats-item-handler': @props.onClick

    return <div className={ itemClasses }
                onClick={ this.handleClick }>
             { this.renderItem() }
           </div>

  renderItem: ->
    if @props.href
      <a href={ this.props.href }
         title={ this.props.count + ' ' + this.props.title }
         className="hero__stats-link">
        <strong className="hero__stats-value">
          { this.props.count }
        </strong>
        <span>
          { this.props.title }
        </span>
      </a>
    else
      <span>
        <strong className="hero__stats-value">
          { this.props.count }
        </strong>
        <span>
          { this.props.title }
        </span>
      </span>

  handleClick: (e) ->
    if @props.onClick
      e.preventDefault()
      @props.onClick()

module.exports = HeroStatsItem