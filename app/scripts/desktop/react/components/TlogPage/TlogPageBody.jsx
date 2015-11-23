import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import PreviousEntriesButton from '../common/PreviousEntriesButton';

class TlogPageBody extends Component {
  state = {
    prevButtonVisible: false,
  }
  componentWillMount() {
    const queryHash = queryString.parse(window.location.search);
    this.setState({ prevButtonVisible: queryHash.since_entry_id });
  }
  render() {
    const { bgStyle, host_tlog_id, hostTlogUrl } = this.props;
    const { prevButtonVisible } = this.state;

    return (
      <div className="page-body">
        {host_tlog_id && prevButtonVisible && <PreviousEntriesButton href={hostTlogUrl} />}
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle}/>
          <div className="content-area__inner">
            <EntryTlogsContainer {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

TlogPageBody.propTypes = {
  bgStyle: PropTypes.object,
  entries_info: PropTypes.object,
  hostTlogUrl: PropTypes.string,
  host_tlog_id: PropTypes.number,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  hostTlogUrl: '',
};

export default TlogPageBody;
