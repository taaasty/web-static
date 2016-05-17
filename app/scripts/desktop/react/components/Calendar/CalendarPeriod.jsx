import { indexOf } from 'lodash';
import { List, Map } from 'immutable';
import React, { PropTypes } from 'react';
import CalendarMarker from './CalendarMarker';

function CalendarPeriod({ period, selectedEntryId, visibleMarkers }) {
  function renderNodes() {
    return period.get('markers', List()).map((marker, i) => {
      const selected = selectedEntryId === marker.get('entryId');
      const highlighted = indexOf(visibleMarkers, marker.get('entryId')) > -1;

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
        {period.get('title')}
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
