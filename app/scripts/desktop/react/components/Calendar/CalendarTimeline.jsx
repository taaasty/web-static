import React, { PropTypes } from 'react';
import CalendarPeriod from './CalendarPeriod';

function CalendarTimeline({ activePost, periods, selectedEntryId, visibleMarkers }) {
  return (
    <div className="calendar__timeline-viewport calendar__timeline-viewport--active">
      <div className="calendar__timeline">
        <ul className="calendar__periods nav">
          {periods.map((period, i) => (
             <CalendarPeriod
               activePost={activePost}
               key={i}
               period={period}
               selectedEntryId={selectedEntryId}
               visibleMarkers={visibleMarkers}
             />))
          }
        </ul>
      </div>
    </div>
  ); 
}

CalendarTimeline.propTypes = {
  periods: PropTypes.array.isRequired,
  selectedEntryId: PropTypes.number,
  visibleMarkers: PropTypes.array,
};

export default CalendarTimeline;
