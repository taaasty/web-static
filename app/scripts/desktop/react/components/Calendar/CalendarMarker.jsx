/*global i18n, ReactGrammarMixin */
import React, { createClass, PropTypes } from 'react';
import { Link } from 'react-router';
import uri from 'urijs';
import classnames from 'classnames';
import moment from 'moment';

const CalendarMarker = createClass({
  propTypes: {
    highlighted: PropTypes.bool.isRequired,
    marker: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
  },
  mixins: [ ReactGrammarMixin ],

  shouldComponentUpdate({ marker: { entry_id: nextEntryId }, selected: nextSelected }) {
    const { marker: { entry_id: entryId }, selected } = this.props;

    return (nextSelected !== selected || nextEntryId !== entryId);
  },
  
  getPercentValueOfDay(day) {
    return (day * parseInt(100, 10) / parseInt(365, 10)).toFixed(2) + '%';
  },
  
  getNumberOfRecords(number) {
    return (number > 0)
      ? i18n.t('marker_comments_count', { count: number })
      : i18n.t('marker_no_comments');
  },

  render() {
    const { marker: { comments_count, created_at, entry_id, entry_url },
            highlighted, selected } = this.props;
    const records = this.getNumberOfRecords(comments_count);
    const date = moment(created_at);
    const createdAt = date.format('D MMMM');
    const leftIndent = this.getPercentValueOfDay(date.dayOfYear());

    const markerClasses = classnames({
      'calendar__period-marker': true,
      'calendar__period-marker--current': selected,
      'calendar__period-marker--highlighted': highlighted,
    });

    return (
      <li>
        <Link
          className={markerClasses}
          data-marker-date={createdAt}
          data-marker-rows={records}
          data-target={`#${entry_id}`}
          style={{ left: leftIndent }}
          to={{ pathname: uri(entry_url).path(), state: { id: entry_id } }}
        />
      </li>
    );
  },
});

export default CalendarMarker;
