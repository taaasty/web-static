import _ from 'lodash';
import React, { PropTypes } from 'react';
import CalendarMarker from './CalendarMarker';

class CalendarPeriod {
  renderNodes() {
    const { period, selectedEntryId, visibleMarkers } = this.props;

    return period.markers.map((marker, i) => {
      const selected = selectedEntryId === marker.entry_id;
      const highlighted = (_.indexOf(visibleMarkers, marker.entry_id) > -1);

      return (
        <CalendarMarker
          highlighted={highlighted}
          key={i}
          marker={marker}
          selected={selected}
        />
      );
    });
  }
  render() {
    return (
      <li className="calendar__period">
        <div className="calendar__period-date">
          {this.props.period.title}
        </div>
        <ul className="calendar__period-line">
          {this.renderNodes()}
        </ul>
      </li>
    );
  }
}

CalendarPeriod.propTypes = {
  period: PropTypes.object.isRequired,
  selectedEntryId: PropTypes.number,
  visibleMarkers: PropTypes.array,
};

export default CalendarPeriod;
