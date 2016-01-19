/*global i18n */
import React, { Component, PropTypes } from 'react';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import CurrentUserStore from '../../stores/current_user';

import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import PinPostButton from './PinPostButton';
import Calendar from '../Calendar';

import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';

class EntryPageContainer extends Component {
  getEntryImg(entry={}) {
    return (entry.image_attachments && entry.image_attachments.length)
      ? entry.image_attachments[0].image.url
      : entry.author && entry.author.userpic.original_url
        ? entry.author.userpic.original_url
        : null;
        
  }
  render() {
    const { bgStyle, commentator, currentUserId, entry, error,
            locale, relationship, stats, successDeleteUrl, user } = this.props;
    const entry = this.props.entry || {};
    
    return (
      <div>
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
                  error={error}
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
        {(!user.is_privacy ||
          currentUserId === user.id ||
          (relationship && relationship.state === RELATIONSHIP_STATE_FRIEND)) &&
         <Calendar
           entryCreatedAt={entry.created_at || (new Date()).toISOString()}
           entryId={entry.id}
           locale={locale}
           tlogId={user.id}
         />}
      </div>
    );
  }
}

EntryPageContainer.propTypes = {
  bgStyle: PropTypes.object,
  commentator: PropTypes.object,
  currentUserId: PropTypes.number,
  entry: PropTypes.object.isRequired,
  error: PropTypes.string,
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
