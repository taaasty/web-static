###* @jsx React.DOM ###

window.CalendarPeriod = React.createClass

  propTypes:
    period:          React.PropTypes.object.isRequired
    selectedEntryId: React.PropTypes.number
    visibleMarkers:  React.PropTypes.array

  render: ->
    that = @
    markerNodes = @props.period.markers.map (marker, i) ->
      selected    = that.props.selectedEntryId == marker.entry_id
      highlighted = (_.indexOf that.props.visibleMarkers, marker.entry_id) > -1

      `<CalendarMarker selected={ selected }
                       highlighted={ highlighted }
                       marker={ marker }
                       key={ i } />`

    return `<li className="calendar__period">
              <div className="calendar__period-date">{ this.props.period.title }</div>
              <ul className="calendar__period-line">{ markerNodes }</ul>
            </li>`