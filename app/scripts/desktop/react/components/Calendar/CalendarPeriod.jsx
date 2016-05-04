import { indexOf } from 'lodash';
import React, { PropTypes } from 'react';
import CalendarMarker from './CalendarMarker';

function CalendarPeriod({ period, selectedEntryId, visibleMarkers }) {
  function renderNodes() {
    return period.markers.map((marker, i) => {
      const selected = selectedEntryId === marker.entryId;
      const highlighted = indexOf(visibleMarkers, marker.entryId) > -1;

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

  return (
    <li className="calendar__period">
      <div className="calendar__period-date">
        {period.title}
      </div>
      <ul className="calendar__period-line">
        {renderNodes()}
      </ul>
    </li>
  );
}

CalendarPeriod.propTypes = {
  period: PropTypes.object.isRequired,
  selectedEntryId: PropTypes.number,
  visibleMarkers: PropTypes.array,
};

export default CalendarPeriod;
