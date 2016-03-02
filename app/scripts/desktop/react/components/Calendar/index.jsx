/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';

import { getCalendar, resetCalendar } from '../../actions/CalendarActions';
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
    const { currentUser: { id }, tlog: { author, my_relationship },
            getCalendar, resetCalendar } = props;
    
    if (author && !author.is_flow && author.slug !== TLOG_SLUG_ANONYMOUS &&
        (!author.is_privacy || author.id === id || my_relationship === RELATIONSHIP_STATE_FRIEND)) {
      getCalendar(author.id);
    } else {
      resetCalendar();
    }
  }
  updatePropsEntry(props) {
    const { isEntry, tlogEntry, tlogEntries } = props;
    const selectedEntry = (isEntry ? tlogEntry : tlogEntries.items.length && tlogEntries.items[0].entry) || {};

    this.updateSelectedEntry(selectedEntry.id, selectedEntry.created_at || (new Date()).toISOString());
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
    const { calendar } = this.props;
    const calendarClasses = classnames({
      'calendar': true,
      'calendar--open': this.isOpen(),
      'calendar--closed': !this.isOpen(),
      'calendar--opened-by-click': this.isOpenedByClick(),
    });
    const { headerDate, selectedEntryId, visibleMarkers } = this.state;
    const periodsCount = calendar.periods.length;

    if (!periodsCount) {
      return null;
    }
    
    return (
      <nav
        className={calendarClasses}
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        {this.isOpen()
         ? periodsCount && periodsCount > 0
           ? <CalendarTimeline
               periods={calendar.periods}
               selectedEntryId={selectedEntryId}
               visibleMarkers={visibleMarkers}
             />
           : <div className="grid-full text--center">
               <div className="grid-full__middle">
                 {periodsCount === 0
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
  calendar: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getCalendar: PropTypes.func.isRequired,
  isEntry: PropTypes.bool.isRequired,
  resetCalendar: PropTypes.func.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default connect(
  (state, { isEntry }) => ({
    isEntry,
    calendar: state.calendar.data,
    currentUser: state.currentUser.data,
    tlog: state.tlog.data,
    tlogEntries: state.tlogEntries.data,
    tlogEntry: state.tlogEntry.data,
  }),
  { getCalendar, resetCalendar }
)(Calendar);
