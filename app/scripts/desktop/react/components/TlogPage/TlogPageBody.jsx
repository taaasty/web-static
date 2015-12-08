import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import PreviousEntriesButton from '../common/PreviousEntriesButton';
import TlogPagePagination from './TlogPagePagination';
import TlogPagePrivate from './TlogPagePrivate';
import TlogPageEmpty from './TlogPageEmpty';
import TlogPageAuthorEmpty from './TlogPageAuthorEmpty';

class TlogPageBody extends Component {
  state = {
    prevButtonVisible: false,
  }
  componentWillMount() {
    const queryHash = queryString.parse(window.location.search);
    this.setState({ prevButtonVisible: queryHash.since_entry_id });
  }
  renderTlog() {
    const { nextPageUrl, prevPageUrl, user: { is_daylog } } = this.props;

    return (
      <div>
        <EntryTlogsContainer {...this.props} />
        {is_daylog && <TlogPagePagination nextPageUrl={nextPageUrl} prevPageUrl={prevPageUrl} />}
      </div>
    );
  }
  render() {
    const { bgStyle, currentUserId, entries_info: { items }, host_tlog_id,
            hostTlogUrl, user: { id, is_daylog, is_privacy } } = this.props;
    const { prevButtonVisible } = this.state;

    return (
      <div className="page-body">
        {host_tlog_id && prevButtonVisible && <PreviousEntriesButton href={hostTlogUrl} />}
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle}/>
          <div className="content-area__inner">
            {isPrivate
             ? <TlogPagePrivate />
             : items.length > 0
               ? this.renderTlog()
               : id && currentUserId === id
                 ? <TlogPageAuthorEmpty name={user.name} slug={user.slug} />
                 : <TlogPageEmpty />
            }
          </div>
        </div>
      </div>
    );
  }
}

TlogPageBody.propTypes = {
  bgStyle: PropTypes.object,
  currentUserId: PropTypes.number,
  entries_info: PropTypes.object,
  hostTlogUrl: PropTypes.string,
  host_tlog_id: PropTypes.number,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  user: PropTypes.object,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  entries_info: {
    items: [],
  },
  hostTlogUrl: '',
  user: {
    id: null,
    is_daylog: false,
    is_privacy: false,
  },
};

export default TlogPageBody;
