import React, { cloneElement, Children, Component } from 'react';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';

import HeroProfile from '../HeroProfile';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';

import { getCalendar } from '../../actions/CalendarActions';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  componentDidMount() {
    this.getCalendar();
  }
  getCalendar() {
    const { currentUserId, dispatch, tlog: { author, my_relationship } } = this.props;
    
    if (author && (!author.is_privacy ||
                   author.id === currentUserId ||
                   my_relationship === RELATIONSHIP_STATE_FRIEND)) {
      dispatch(getCalendar(author.id));
    }
    
  }
  shareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { calendar, children, currentUserId, isLogged, queryString, locale,
            params, section, tlog, tlogEntries, tlogEntry } = this.props;
    const { author, design: { backgroundImageUrl },
            my_relationship, slug, stats, tlog_url } = tlog;
    const calendarEntry = (params.entryPath
      ? tlogEntry
      : tlogEntries.items.length && tlogEntries.items[0].entry) || {};
    const childrenWithProps = Children.map(
      children,
      (child) => cloneElement(child, { currentUserId, tlog, tlogEntries, tlogEntry })
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

export default TlogPageRoot;
