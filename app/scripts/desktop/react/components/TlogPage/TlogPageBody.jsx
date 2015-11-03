import React, { PropTypes } from 'react';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import PreviousEntriesButton from './PreviousEntriesButton';

class TlogPageBody {
  render() {
    const { bgStyle, host_tlog_id, hostTlogUrl } = this.props;

    return (
      <div className="page-body">
        {host_tlog_id && <PreviousEntriesButton href={hostTlogUrl} />}
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
  entries_info: PropTypes.object,
  bgStyle: PropTypes.object,
  hostTlogUrl: PropTypes.string,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  hostTlogUrl: 'http://ya.ru',
};

export default TlogPageBody;
