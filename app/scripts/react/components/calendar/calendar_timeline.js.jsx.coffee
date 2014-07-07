###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods: React.PropTypes.array

  getPeriodsClass: ->
    return "calendar__timeline__#{@props.periods.length}_periods"

  render: ->
    periodNodes = @props.periods.map (period) ->
      `<CalendarPeriod period={ period } key={ period.title }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport">
              <div className="calendar__timeline">
                <ul className={ "calendar__periods " + this.getPeriodsClass()}>{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline