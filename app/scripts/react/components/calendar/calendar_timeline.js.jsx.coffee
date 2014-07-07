###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods: React.PropTypes.array

  render: ->
    periodNodes = @props.periods.map (period) ->
      `<CalendarPeriod period={ period } key={ period.title }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport">
              <div className="calendar__timeline">
                <ul className="calendar__periods">{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline