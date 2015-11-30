/*global i18n, Calendar */
import React, { Component, PropTypes } from 'react';

import HeroProfile from '../HeroProfile';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import PinPostButton from './PinPostButton';
//import Calendar from '../Calendar/calendar';

class EntryPageContainer extends Component {
  render() {
    const { bgImage, bgStyle, commentator, entry, locale,
            relationship, stats, successDeleteUrl, user } = this.props;

    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ bgStyle }} />
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
                <div className="content-area__bg" style={{ backgroundImage: bgImage }} />
                <div className="content-area__inner">
                  {user.id === entry.author.id && !entry.is_private &&
                   <PinPostButton
                     entryId={entry.id}
                     orderId={entry.fixed_order_id}
                     status={entry.fixed_state}
                     till={entry.fixed_up_at}
                   />
                  }
                  <EntryTlog
                    commentator={commentator}
                    entry={entry}
                    host_tlog_id={user.id}
                    locale={locale}
                    successDeleteUrl={successDeleteUrl}
                  />
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
  entry: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  relationship: PropTypes.object,
  stats: PropTypes.object.isRequired,
  successDeleteUrl: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default EntryPageContainer;
