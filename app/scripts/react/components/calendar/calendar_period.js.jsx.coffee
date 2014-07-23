###* @jsx React.DOM ###

window.CalendarPeriod = CalendarPeriod = React.createClass

  propTypes:
    period:       React.PropTypes.object.isRequired
    currentEntry: React.PropTypes.object
    activePost:   React.PropTypes.number

  render: ->
    that = @
    markerNodes = @props.period.markers.map (marker, i) ->
      selected = that.props.activePost == marker.entry_id || that.props.currentEntry?.id == marker.entry_id
      `<CalendarMarker selected={ selected }
                       marker={ marker }
                       key={ i } />`

    return `<li className="calendar__period">
              <div className="calendar__period-date">{ this.props.period.title }</div>
              <ul className="calendar__period-line">{ markerNodes }</ul>
            </li>`

module.exports = CalendarPeriod
