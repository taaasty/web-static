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

  shouldComponentUpdate(nextProps) {
    const { marker, selected } = this.props;

    return (
      marker !== nextProps.marker ||
      selected !== nextProps.selected
    );
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
    const { marker, highlighted, selected } = this.props;
    const entryId = marker.get('entryId');
    const records = this.getNumberOfRecords(marker.get('commentsCount', 0));
    const date = moment(marker.get('createdAt'));
    const createdAtStr = date.format('D MMMM');
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
          data-marker-date={createdAtStr}
          data-marker-rows={records}
          data-target={`#${entryId}`}
          style={{ left: leftIndent }}
          to={{ pathname: uri(marker.get('entryUrl', 0)).path(), state: { id: entryId } }}
        />
      </li>
    );
  },
});

export default CalendarMarker;
