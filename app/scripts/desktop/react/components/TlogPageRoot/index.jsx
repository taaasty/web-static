import React, { cloneElement, Children, Component, PropTypes } from 'react';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';

import HeroProfile from '../HeroProfile';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  componentDidMount() {
    this.getCalendarData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.getCalendarData(nextProps);
    this.props.TlogActions.getTlog(nextProps.routeParams.slug);

    if (this.props.tlog.data.design !== nextProps.tlog.data.design) {
      DesignPreviewService.apply(nextProps.tlog.data.design);
    }
  }
  getCalendarData(props) {
    const { currentUserId, tlog: { data: { author, my_relationship } }, CalendarActions } = props;
    
    if (author && (!author.is_privacy ||
                   author.id === currentUserId ||
                   my_relationship === RELATIONSHIP_STATE_FRIEND)) {
      CalendarActions.getCalendar(author.id);
    }
    
  }
  shareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { calendar, children, currentUserId, isLogged, locale,
            params, tlog, tlogEntries, tlogEntry,
            CalendarActions, TlogActions, TlogEntriesActions, TlogEntryActions } = this.props;
    const { author, design: { backgroundImageUrl },
            my_relationship, slug, stats, tlog_url } = tlog.data;
    const calendarEntry = (params.entryPath
      ? tlogEntry.data
      : tlogEntries.data.items.length && tlogEntries.data.items[0].entry) || {};
    const childrenWithProps = Children.map(
      children,
      (child) => cloneElement(
        child, {
          currentUserId,
          tlog,
          tlogEntries,
          tlogEntry,
          CalendarActions,
          TlogActions,
          TlogEntriesActions,
          TlogEntryActions,
        })
    );
    
    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} />
            <header className="page-header">
              <HeroProfile
                locale={locale}
                relationship={my_relationship}
                stats={stats}
                user={author}
              />
            </header>
            {childrenWithProps}
          </div>
        </div>
        {!isLogged && <Auth fixed locale={locale} />}
        {!!calendar.periods.length &&
         <Calendar
            calendar={calendar}
            entryCreatedAt={calendarEntry.created_at || (new Date()).toISOString()}
            entryId={calendarEntry.id}
            locale={locale}
            tlogId={author.id}
         />}
        <SocialShare
          img={this.shareImg(author)}
          title={slug}
          url={tlog_url}
        />
      </div>
    );
  }
}

TlogPageRoot.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  TlogActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  TlogEntryActions: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  currentUserId: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  section: PropTypes.string.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default TlogPageRoot;
