/*global i18n, Calendar */
import React, { Component, PropTypes } from 'react';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import CurrentUserStore from '../../stores/current_user';

import HeroProfile from '../HeroProfile';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import PinPostButton from './PinPostButton';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';
import Calendar from '../Calendar';

class EntryPageContainer extends Component {
  getEntryImg(entry={}) {
    return (entry.image_attachments && entry.image_attachments.length)
      ? entry.image_attachments[0].image.url
      : entry.author && entry.author.userpic.original_url
        ? entry.author.userpic.original_url
        : null;
        
  }
  render() {
    const { bgImage, bgStyle, commentator, currentUserId, entry, isLogged,
            locale, relationship, stats, successDeleteUrl, user } = this.props;

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
            <div className="page-body">
              <div className="content-area">
                <div className="content-area__bg" style={bgStyle} />
                <div className="content-area__inner">
                  {currentUserId && entry.author &&
                   currentUserId === entry.author.id && !entry.is_private &&
                   <PinPostButton
                     entryId={entry.id}
                     orderId={entry.fixed_order_id}
                     status={entry.fixed_state}
                     till={entry.fixed_up_at}
                   />
                  }
                  <div>
                    <EntryTlog
                      commentator={commentator}
                      entry={entry}
                      host_tlog_id={user.id}
                      locale={locale}
                      successDeleteUrl={successDeleteUrl}
                    />
                  </div>
                  <nav className="pagination">
                    <a className="pagination__item" href={user.tlog_url}>
                      {i18n.t('buttons.pagination.tlog_root')}
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isLogged && <Auth fixed={true} locale={locale} />}
        <SocialShare
          img={this.getEntryImg(entry)}
          title={entry.title}
          url={entry.url}
        />
        <Calendar
          entryCreatedAt={entry.created_at}
          entryId={entry.id}
          locale={locale}
          tlogId={user.id}
        />
      </div>
    );
  }
}

EntryPageContainer.propTypes = {
  bgImage: PropTypes.string.isRequired,
  bgStyle: PropTypes.object,
  commentator: PropTypes.object,
  currentUserId: PropTypes.number,
  entry: PropTypes.object.isRequired,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  relationship: PropTypes.object,
  stats: PropTypes.object.isRequired,
  successDeleteUrl: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default connectToStores(
  EntryPageContainer,
  [ CurrentUserStore ],
  () => ({
    currentUserId: CurrentUserStore.getUserID(),
    isLogged: CurrentUserStore.isLogged(),
  })
);
