/*global Calendar */
import React, { Component, PropTypes } from 'react';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import CurrentUserStore from '../../stores/current_user';

import HeroProfile from '../HeroProfile';
import TlogPageBody from './TlogPageBody';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageContainer extends Component {
  getShareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { bgImage, bgStyle, currentUserId, entries_info, isLogged, loadUrl,
            locale, nextPageFieldName, nextPageParamName, nextPageUrl, prevPageUrl,
            relationship, stats, user } = this.props;

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
        <Calendar
          locale={locale}
          tlogId={user.id}
        />
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
  stats: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

TlogPageContainer.defaultProps = {
};

export default connectToStores(
  TlogPageContainer,
  [ CurrentUserStore ],
  () => ({
    currentUserId: CurrentUserStore.getUserID(),
    isLogged: CurrentUserStore.isLogged,
  })
);
