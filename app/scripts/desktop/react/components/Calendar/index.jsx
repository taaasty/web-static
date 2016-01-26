/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import CalendarHeader from './CalendarHeader';
import CalendarTimeline from './CalendarTimeline';

const MOUSE_LEAVE_TIMEOUT = 300;
const CALENDAR_CLOSED = 'closed';
const CALENDAR_OPENED_BY_HOVER = 'openedByHover';
const CALENDAR_OPENED_BY_CLICK = 'openedByClick';
const TARGET_POST_CLASS = '.post';
const TARGET_POST_PARENT_CLASS = '.posts';
  
class Calendar extends Component {
  state = {
    currentState: CALENDAR_CLOSED,
    headerDate: this.headerDate(),
    selectedEntryId: this.props.entryId,
    visibleMarkers: [],
  };
  componentDidMount() {
    this.setVisibleMarkers();
    const $post = $(TARGET_POST_CLASS);

    // Следим за скроллингом, только если находимся на странице списка постов
    if ($post.closest(TARGET_POST_PARENT_CLASS)) {
      $(document).on('waypoint.trigger', (ev, { id, time }) => (
        this.updateSelectedEntry(id, time)
      ));
    }
  }
  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
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
  headerDate() {
    return moment(this.props.entryCreatedAt || this.firstPostDate());
  }
  firstPostDate() {
    try {
      return $(TARGET_POST_CLASS).get(0).dataset.time;
    }
    catch (error) {
      console.error(error);
      return null;
    }
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
  calendar: PropTypes.object,
  entryCreatedAt: PropTypes.string,
  entryId: PropTypes.number,
  tlogId: PropTypes.number.isRequired,
};

export default Calendar;
