import React, { PropTypes } from 'react';
import moment from 'moment';

class CalendarHeader {
  render() {
    const { date } = this.props;
    const sameYear = moment().year() === date.year();

    return (
      <div className="calendar__date">
        <div className="calendar__date-day">
          {date.format('D')}
        </div>
        <div className="calendar__date-info">
          {date.format('MMMM')}<br />
          {date.format('dddd')}<br />
          {date.format(sameYear ? 'HH:mm' : 'YYYY')}
        </div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  date: PropTypes.object.isRequired,
};

export default CalendarHeader;
