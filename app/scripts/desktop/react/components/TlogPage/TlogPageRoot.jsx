import React, { cloneElement, Children, Component, PropTypes } from 'react';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import HeroProfile from '../HeroProfileSPA';
import HeroFlow from '../HeroComponent/HeroFlowSPA';
import SocialShare from '../common/SocialShare';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  componentDidMount() {
    if (this.isFlow(this.props)) {
      document.body.className = 'layout--feed';
    } else {
      document.body.className = 'layout--tlog';
      DesignPreviewService.apply(this.props.tlog.data.design);
      this.getCalendarData(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getCalendarData(nextProps);
    this.props.TlogActions.getTlog(this.slug(nextProps));

    if (this.isFlow(nextProps)) {
      document.body.className = 'layout--feed';
    } else if (this.props.tlog.data.design !== nextProps.tlog.data.design) {
      document.body.className = 'layout--tlog';
      DesignPreviewService.apply(nextProps.tlog.data.design);
    }
  }
  isFlow(props) {
    return props.tlog.data.author && props.tlog.data.author.is_flow;
  }
  slug({ params }) {
    return params.slug || (params.anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);
  }
  getCalendarData(props) {
    const { currentUser: { data: { id } }, tlog: { data: { author, my_relationship } }, CalendarActions } = props;
    
    if (!this.isFlow(props) && author && author.slug !== TLOG_SLUG_ANONYMOUS &&
        (!author.is_privacy || author.id === id || my_relationship === RELATIONSHIP_STATE_FRIEND)) {
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
    const { calendar, children, currentUser, feedEntries, flow, location, params, tlog,
            tlogEntries, tlogEntry, CalendarActions, FlowActions, RelationshipActions,
            TlogActions, TlogEntriesActions, TlogEntryActions } = this.props;
    const currentUserId = currentUser.data.id;
    const { author, design: { backgroundImageUrl }, slug, stats, tlog_url } = tlog.data;
    const isFlow = this.isFlow(this.props);
    const calendarEntry = (params.entryPath
      ? tlogEntry.data
      : tlogEntries.data.items.length && tlogEntries.data.items[0].entry) || {};
    const childrenWithProps = Children.map(
      children,
      (child) => cloneElement(
        child,
        {
          CalendarActions,
          FlowActions,
          TlogActions,
          TlogEntriesActions,
          TlogEntryActions,
          currentUserId,
          currentUser,
          feedEntries,
          flow,
          isFlow,
          tlog,
          tlogEntries,
          tlogEntry,
          sinceId: location.query.since_entry_id,
        })
    );
    
    return (
      <div className="page__inner">
        <div className="page__paper">
          {!isFlow &&
           <div className="page-cover js-cover" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} />
          }
           <header className="page-header">
             {isFlow
              ? <HeroFlow
                  FlowActions={FlowActions}
                  RelationshipActions={RelationshipActions}
                  flow={flow}
                  tlog={tlog}
                />
              : <HeroProfile
                  RelationshipActions={RelationshipActions}
                  currentUser={currentUser.data}
                  stats={stats}
                  tlog={tlog}
                />
             }
           </header>
           {childrenWithProps}
        </div>
        {!!calendar.data.periods.length &&
         <Calendar
           calendar={calendar.data}
           entryCreatedAt={calendarEntry.created_at || (new Date()).toISOString()}
           entryId={calendarEntry.id}
           tlogId={author.id}
         />}
         {!isFlow &&
          <SocialShare
            img={this.shareImg(author)}
            title={slug}
            url={tlog_url}
          />}
      </div>
    );
  }
}

TlogPageRoot.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  FlowActions: PropTypes.object.isRequired,
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
  feedEntries: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default TlogPageRoot;
