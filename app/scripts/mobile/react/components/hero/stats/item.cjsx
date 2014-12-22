cx = require 'react/lib/cx'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'HeroStatsItem'

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
                onClick={ @handleClick }>
             { @renderItem() }
           </div>

  renderItem: ->
    if @props.href
      <a href={ @props.href }
         title={ @props.count + ' ' + @props.title }
         className="hero__stats-link">
        <strong className="hero__stats-value">
          { @props.count }
        </strong>
        <span>
          { @props.title }
        </span>
      </a>
    else
      <span>
        <strong className="hero__stats-value">
          { @props.count }
        </strong>
        <span>
          { @props.title }
        </span>
      </span>

  handleClick: (e) ->
    if @props.onClick
      e.preventDefault()
      @props.onClick()