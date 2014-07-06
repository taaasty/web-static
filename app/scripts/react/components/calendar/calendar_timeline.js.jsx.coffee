###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods: React.PropTypes.array

  render: ->
    sortedPeriods = _.sortBy @props.periods, (period) -> period.title
    periodNodes = sortedPeriods.map (period) ->
      `<CalendarPeriod title={ period.title } markers={period.markers} key={ period.title }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport">
              <div className="calendar__timeline">
                <ul className="calendar__periods">{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline