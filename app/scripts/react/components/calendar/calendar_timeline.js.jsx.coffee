###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods:      React.PropTypes.array.isRequired
    currentEntry: React.PropTypes.object

  render: ->
    that = @
    periodNodes = @props.periods.map (period) ->
      `<CalendarPeriod currentEntry={ that.props.currentEntry } period={ period } key={ period.title }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport">
              <div className="calendar__timeline">
                <ul className="calendar__periods">{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline