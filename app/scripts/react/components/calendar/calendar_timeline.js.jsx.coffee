###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods:      React.PropTypes.array.isRequired
    currentEntry: React.PropTypes.object

  componentDidMount: ->
    timelineSelector = '.' + @refs.timeline.getDOMNode().className
    $('body').scrollspy target: timelineSelector

  render: ->
    that = @
    periodNodes = @props.periods.map (period, i) ->
      `<CalendarPeriod currentEntry={ that.props.currentEntry } period={ period } key={ i }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport calendar__timeline-viewport--active">
              <div className="calendar__timeline" ref="timeline">
                <ul className="calendar__periods nav">{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline
