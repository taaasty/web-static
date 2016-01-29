/*global i18n */
import React, { Component, PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';
import Spinnner from '../../../../shared/react/components/common/Spinner';

import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import PinPostButton from './PinPostButton';

class EntryPageContainer extends Component {
  componentWillMount() {
    this.fetchData(this.props.location.state.id);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.location.state.id);
  }
  fetchData(newId) {
    const { TlogEntryActions, tlogEntries: { items }, tlogEntry } = this.props;

    if (!tlogEntry.id || newId !== tlogEntry.id) {
      const entries = items.filter((item) => item.entry.id === newId);

      if (entries.length) {
        TlogEntryActions.tlogEntrySet(entries[0].entry);
      }
    }
  }
  commentator() {
    const { tlogEntries, tlogEntry } = this.props;
    const entries = tlogEntries.items.filter((e) => e.entry.id === tlogEntry.id);

    return !!entries.length && entries[0].commentator;
  }
  render() {
    const { bgStyle, currentUserId, error, locale, tlog, tlogEntry } = this.props;

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
            {currentUserId && tlogEntry.author &&
             currentUserId === tlogEntry.author.id && !tlogEntry.is_private &&
             <PinPostButton
               entryId={tlogEntry.id}
               orderId={tlogEntry.fixed_order_id}
               status={tlogEntry.fixed_state}
               till={tlogEntry.fixed_up_at}
             />
            }
            <div>
              {tlogEntry.type && !tlogEntry.isFetching
               ? <EntryTlog
                   commentator={this.commentator()}
                   entry={tlogEntry}
                   error={error}
                   host_tlog_id={tlog.author.id}
                   locale={locale}
                   successDeleteUrl={tlog.author && tlog.author.tlog_url}
                 />
               : <Spinner size={35} />
              }
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
