###* @jsx React.DOM ###

window.CalendarPeriod = CalendarPeriod = React.createClass

  propTypes:
    title:   React.PropTypes.number.isRequired
    markers: React.PropTypes.array

  render: ->
    markerNodes = @props.markers.map (marker) ->
      `<CalendarMarker marker={ marker } key={ marker.entry_id }></CalendarMarker>`

    return `<li className="calendar__period">
              <div className="calendar__period-date">{ this.props.title }</div>
              <div className="calendar__period-line">{ markerNodes }</div>
            </li>`

module.exports = CalendarPeriod