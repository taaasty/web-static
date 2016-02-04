import React, { cloneElement, Children, Component, PropTypes } from 'react';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import HeroProfile from '../HeroProfile/indexSPA';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';
import UserToolbarContainer from '../toolbars/UserToolbarContainer';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  componentDidMount() {
    this.getCalendarData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.getCalendarData(nextProps);
    this.props.TlogActions.getTlog(this.slug(nextProps));

    if (this.props.tlog.data.design !== nextProps.tlog.data.design) {
      DesignPreviewService.apply(nextProps.tlog.data.design);
    }
  }
  slug({ params }) {
    return params.slug || (params.anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);
  }
  getCalendarData(props) {
    const { currentUserId, tlog: { data: { author, my_relationship } }, CalendarActions } = props;
    
    if (author && author.slug !== TLOG_SLUG_ANONYMOUS &&
        (!author.is_privacy ||
         author.id === currentUserId ||
         my_relationship === RELATIONSHIP_STATE_FRIEND)) {
      CalendarActions.getCalendar(author.id);
    } else {
      CalendarActions.resetCalendar();
    }
    
  }
  shareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { calendar, children, currentUser, currentUserId, isLogged, location,
            params, tlog, tlogEntries, tlogEntry, CalendarActions, RelationshipActions,
            TlogActions, TlogEntriesActions, TlogEntryActions } = this.props;
    const { author, design: { backgroundImageUrl }, slug, stats, tlog_url } = tlog.data;
    const calendarEntry = (params.entryPath
      ? tlogEntry.data
      : tlogEntries.data.items.length && tlogEntries.data.items[0].entry) || {};
    const childrenWithProps = Children.map(
      children,
      (child) => cloneElement(
        child, {
          currentUserId,
          currentUser,
          tlog,
          tlogEntries,
          tlogEntry,
          CalendarActions,
          TlogActions,
          TlogEntriesActions,
          TlogEntryActions,
          sinceId: location.query.since_entry_id,
        })
    );
    
    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} />
            <header className="page-header">
              <HeroProfile
                RelationshipActions={RelationshipActions}
                currentUser={currentUser.data}
                stats={stats}
                tlog={tlog}
              />
            </header>
            {childrenWithProps}
          </div>
        </div>
        {!isLogged && <Auth fixed locale={locale} />}
        {!!calendar.data.periods.length &&
         <Calendar
            calendar={calendar.data}
            entryCreatedAt={calendarEntry.created_at || (new Date()).toISOString()}
            entryId={calendarEntry.id}
            tlogId={author.id}
         />}
        <SocialShare
          img={this.shareImg(author)}
          title={slug}
          url={tlog_url}
        />
        <UserToolbarContainer {...window.STATE_FROM_SERVER.userToolbar} />
      </div>
    );
  }
}

TlogPageRoot.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  RelationshipActions: PropTypes.object.isRequired,
  TlogActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  TlogEntryActions: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  currentUser: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default TlogPageRoot;
