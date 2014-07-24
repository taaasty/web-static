###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods:        React.PropTypes.array.isRequired
    currentEntry:   React.PropTypes.object
    activePost:     React.PropTypes.number
    visibleMarkers: React.PropTypes.array

  render: ->
    that = @
    periodNodes = @props.periods.map (period, i) ->
      `<CalendarPeriod period={ period }
                       activePost={ that.props.activePost }
                       currentEntry={ that.props.currentEntry }
                       visibleMarkers={ that.props.visibleMarkers }
                       key={ i } />`

    return `<div className="calendar__timeline-viewport calendar__timeline-viewport--active">
              <div className="calendar__timeline" ref="timeline">
                <ul className="calendar__periods nav" ref="periodsList">{ periodNodes }</ul>
              </div>
            </div>`

module.exports = CalendarTimeline
