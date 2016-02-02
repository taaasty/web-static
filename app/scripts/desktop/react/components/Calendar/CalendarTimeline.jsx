import React, { PropTypes } from 'react';
import CalendarPeriod from './CalendarPeriod';

class CalendarTimeline {
  render() {
    const { activePost, periods, selectedEntryId, visibleMarkers } = this.props;

    return (
      <div className="calendar__timeline-viewport calendar__timeline-viewport--active">
        <div className="calendar__timeline" ref="timeline">
          <ul className="calendar__periods nav" ref="periodsList">
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
}

CalendarTimeline.propTypes = {
  periods: PropTypes.array.isRequired,
  selectedEntryId: PropTypes.number,
  visibleMarkers: PropTypes.array,
};

export default CalendarTimeline;
