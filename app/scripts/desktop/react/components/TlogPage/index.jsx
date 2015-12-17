/*global Calendar */
import React, { Component, PropTypes } from 'react';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import CurrentUserStore from '../../stores/current_user';

import HeroProfile from '../HeroProfile';
import TlogPageBody from './TlogPageBody';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';

import {
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_FLOW,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_TLOG,
} from '../../../../shared/constants/Tlog';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageContainer extends Component {
  getShareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  showCalendar() {
    const { currentUserId, relationship, section, user } = this.props;
    const privateAccess = user.id && currentUserId === user.id ||
            relationship && relationship.state == RELATIONSHIP_STATE_FRIEND;

    return user.total_entries_count > 0 &&
      (section !== TLOG_SECTION_PRIVATE || privateAccess);
  }
  render() {
    const { bgImage, bgStyle, currentUserId, entries_info, isLogged, loadUrl,
            locale, nextPageFieldName, nextPageParamName, nextPageUrl, prevPageUrl,
            relationship, section, stats, user } = this.props;
    const firstEntry = entries_info && entries_info.items &&
            entries_info.items.length && entries_info.items[0].entry;

    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: `url('${bgImage}')` }} />
            <header className="page-header">
              <HeroProfile
                locale={locale}
                relationship={relationship}
                stats={stats}
                user={user}
              />
            </header>
            <TlogPageBody
              bgStyle={bgStyle}
              currentUserId={currentUserId}
              entries_info={entries_info}
              hostTlogUrl={user.tlog_url}
              loadUrl={loadUrl}
              locale={locale}
              nextPageFieldName={nextPageFieldName}
              nextPageParamName={nextPageParamName}
              nextPageUrl={nextPageUrl}
              prevPageUrl={prevPageUrl}
              relationship={relationship}
              section={section}
              user={user}
            />
          </div>
        </div>
        {!isLogged && <Auth fixed locale={locale} />}
        <SocialShare
          img={this.getShareImg(user)}
          title={user.slug}
          url={user.tlog_url}
        />  
        {this.showCalendar() &&
         <Calendar
           entryCreatedAt={firstEntry.created_at}
           entryId={firstEntry.id}
           locale={locale}
           tlogId={user.id}
         />}
      </div>
    );
  }
}

TlogPageContainer.propTypes = {
  bgImage: PropTypes.string.isRequired,
  bgStyle: PropTypes.object,
  currentUserId: PropTypes.number,
  entries_info: PropTypes.object,
  isLogged: PropTypes.bool,
  loadUrl: PropTypes.string,
  locale: PropTypes.string.isRequired,
  nextPageFieldName: PropTypes.string,
  nextPageParamName: PropTypes.string,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  relationship: PropTypes.object,
  section: PropTypes.oneOf([
    TLOG_SECTION_FAVORITE,
    TLOG_SECTION_FLOW,
    TLOG_SECTION_PRIVATE,
    TLOG_SECTION_TLOG,
  ]).isRequired,
  stats: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

TlogPageContainer.defaultProps = {
  section: TLOG_SECTION_TLOG,
};

export default connectToStores(
  TlogPageContainer,
  [ CurrentUserStore ],
  () => ({
    currentUserId: CurrentUserStore.getUserID(),
    isLogged: CurrentUserStore.isLogged(),
  })
);
