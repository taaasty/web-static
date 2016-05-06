/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';

import { getCalendar } from '../../actions/CalendarActions';
import CalendarHeader from './CalendarHeader';
import CalendarTimeline from './CalendarTimeline';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

const MOUSE_LEAVE_TIMEOUT = 300;
const CALENDAR_CLOSED = 'closed';
const CALENDAR_OPENED_BY_HOVER = 'openedByHover';
const CALENDAR_OPENED_BY_CLICK = 'openedByClick';
const TARGET_POST_CLASS = '.post';
const TARGET_POST_PARENT_CLASS = '.posts';

class Calendar extends Component {
  state = {
    currentState: CALENDAR_CLOSED,
    visibleMarkers: [],
  };
  componentWillMount() {
    this.getCalendarData(this.props);
    this.updatePropsEntry(this.props);
  }
  componentDidMount() {
    this.setVisibleMarkers();
    const $post = $(TARGET_POST_CLASS);

    // Следим за скроллингом, только если находимся на странице списка постов
    if ($post.closest(TARGET_POST_PARENT_CLASS)) {
      this.scrollHandler = (ev, { id, time }) => (
        this.updateSelectedEntry(parseInt(id, 10), time)
      );

      $(document).on('waypoint.trigger', this.scrollHandler);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getCalendarData(nextProps);
    this.updatePropsEntry(nextProps);
  }
  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    if (this.scrollHandler) {
      $(document).off('waypoint.trigger', this.scrollHandler);
    }
  }
  getCalendarData(props) {
    const { currentUser: { id }, tlog, getCalendar } = props;

    if (tlog.id && !tlog.isFlow && tlog.slug !== TLOG_SLUG_ANONYMOUS &&
        (!tlog.isPrivacy || tlog.id === id || tlog.myRelationship === RELATIONSHIP_STATE_FRIEND)) {
      getCalendar(tlog.id);
    }
  }
  updatePropsEntry(props) {
    const { selectedEntry } = props;

    this.updateSelectedEntry(selectedEntry.id, selectedEntry.createdAt || (new Date()).toISOString());
  }
  updateSelectedEntry(id, time) {
    this.setState({
      headerDate: moment(time),
      selectedEntryId: id,
    });
  }
  setVisibleMarkers() {
    const $post = $(TARGET_POST_CLASS);
    this.setState({ visibleMarkers: $post.map(function() { parseInt(this.dataset.id); }).get() });
  }
  onMouseEnter() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    if (this.state.currentState === CALENDAR_CLOSED) {
      this.setState({currentState: CALENDAR_OPENED_BY_HOVER });
    }
  }
  onMouseLeave() {
    if (this.state.currentState === CALENDAR_OPENED_BY_HOVER) {
      this.timeout = window.setTimeout(
        () => this.setState({ currentState: CALENDAR_CLOSED }),
        MOUSE_LEAVE_TIMEOUT
      );
    }
  }
  onClick() {
    switch (this.state.currentState) {
    case CALENDAR_CLOSED:
      this.setState({ currentState: CALENDAR_OPENED_BY_CLICK });
      break;
    case CALENDAR_OPENED_BY_CLICK:
      this.setState({ currentState: CALENDAR_CLOSED });
      break;
    case CALENDAR_OPENED_BY_HOVER:
      this.setState({ currentState: CALENDAR_OPENED_BY_CLICK });
      break;
    }
  }
  isOpen() {
    return (this.state.currentState !== CALENDAR_CLOSED);
  }
  isOpenedByClick() {
    return (this.state.currentState === CALENDAR_OPENED_BY_CLICK);
  }
  render() {
    const { calendar: { periods=[] } } = this.props;

    if (!periods) {
      return null;
    }

    const calendarClasses = classnames({
      'calendar': true,
      'calendar--open': this.isOpen(),
      'calendar--closed': !this.isOpen(),
      'calendar--opened-by-click': this.isOpenedByClick(),
    });
    const { headerDate, selectedEntryId, visibleMarkers } = this.state;
    
    return (
      <nav
        className={calendarClasses}
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        {this.isOpen()
         ? periods.length > 0
           ? <CalendarTimeline
               periods={periods}
               selectedEntryId={selectedEntryId}
               visibleMarkers={visibleMarkers}
             />
           : <div className="grid-full text--center">
               <div className="grid-full__middle">
                 {periods.length === 0
                  ? <div>{i18n.t('calendar_empty')}</div>
                  : <span className="spinner spinner--24x24">
                      <span className="spinner__icon" />
                    </span>
                 }
               </div>
             </div>
         : <CalendarHeader date={headerDate} />
        }
      </nav>
    );
  }
}

Calendar.propTypes = {
  calendar: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  getCalendar: PropTypes.func.isRequired,
  selectedEntry: PropTypes.object,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state, { entryId, tlog }) => {
    const { calendar: calendarStore, calendarPeriod, marker, entry } = state.entities;
    const calendar = (tlog.id && calendarStore[tlog.id]) || {};
    const periods = (calendar.periods || []).map((periodId) => {
      const { markers, ...rest } = calendarPeriod[periodId];

      return Object.assign({}, rest, {
        markers: (markers || []).map((markerId) => marker[markerId]),
      });
    });
    const [ firstEntryId ] = state.tlogEntries.data.items;
    const selectedEntry = (entry[entryId || firstEntryId]) || {};

    return {
      selectedEntry,
      calendar: Object.assign({}, calendar, { periods }),
      currentUser: state.currentUser.data,
    };
  },
  { getCalendar }
)(Calendar);
