/*global i18n */
import React, { Component, PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import PinPostButton from './PinPostButton';

class EntryPageContainer extends Component {
  componentWillMount() {
    const { state } = this.props.location;
    state && this.fetchData(state.id);
  }
  componentWillReceiveProps(nextProps) {
    const { state } = nextProps.location;
    if (state && !nextProps.tlogEntry.isFetching) {
      this.fetchData(state.id);
    }
  }
  fetchData(newId) {
    if (!newId) {
      return;
    }

    const { TlogEntryActions, tlogEntries: { data: { items } },
            tlogEntry } = this.props;

    if (!tlogEntry.data.id || newId !== tlogEntry.data.id) {
      const entries = items.filter((item) => item.entry.id === newId);
      const entry = entries[0];

      if (entry) {
        TlogEntryActions.setTlogEntry({ ...entry.entry, commentator: entry.commentator });
      } else {
        TlogEntryActions.getTlogEntry(newId);
      }
    }
  }
  render() {
    const { bgStyle, currentUserId, error, locale, tlog, tlogEntry } = this.props;

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
            {currentUserId && tlogEntry.data.author &&
             currentUserId === tlogEntry.data.author.id && !tlogEntry.data.is_private &&
             <PinPostButton
               entryId={tlogEntry.data.id}
               orderId={tlogEntry.data.fixed_order_id}
               status={tlogEntry.data.fixed_state}
               till={tlogEntry.data.fixed_up_at}
             />
            }
            <div>
              <EntryTlog
                commentator={tlogEntry.data.commentator}
                entry={tlogEntry.data}
                error={error}
                host_tlog_id={tlog.author.id}
                locale={locale}
                successDeleteUrl={tlog.author && tlog.author.tlog_url}
              />
            </div>
            <nav className="pagination">
              <Link className="pagination__item" to={uri(tlog.author.tlog_url).path()}>
                {i18n.t('buttons.pagination.tlog_root')}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

EntryPageContainer.propTypes = {
  TlogEntryActions: PropTypes.object.isRequired,
  bgStyle: PropTypes.object,
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default EntryPageContainer;
