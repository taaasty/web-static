###* @jsx React.DOM ###

window.CalendarPeriod = CalendarPeriod = React.createClass

  propTypes:
    period:       React.PropTypes.object.isRequired
    currentEntry: React.PropTypes.object

  render: ->
    that = @
    markerNodes = @props.period.markers.map (marker) ->
      selected = that.props.currentEntry?.id == marker.entry_id
      `<CalendarMarker selected={ selected } marker={ marker } key={ marker.entry_id }></CalendarMarker>`

    return `<li className="calendar__period">
              <div className="calendar__period-date">{ this.props.period.title }</div>
              <div className="calendar__period-line">{ markerNodes }</div>
            </li>`

module.exports = CalendarPeriod