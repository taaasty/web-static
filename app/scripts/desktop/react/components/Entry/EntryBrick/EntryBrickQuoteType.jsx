import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

function EntryBrickQuoteType({ entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline }) {
  function renderQuoteSource() {
    return (
      <span className="blockquote__caption">—
        <span className="blockquote__source">
          <i>{entry.source_truncated}</i>
        </span>
      </span>
    );
  }

  return (
    <span>
      <div className="brick__body">
        <a className="brick__link" href={entry.url}>
          <blockquote className="blockquote">
            <span className="laquo">«</span>
            {entry.text_truncated}
            <span className="raquo">»</span>
            {entry.source_truncated && renderQuoteSource()}
          </blockquote>
        </a>
      </div>
      <div className="brick__meta">
        <EntryBrickMetabar
          entry={entry}
          host_tlog_id={host_tlog_id}
        />
      </div>
      <EntryBrickActions
        hasModeration={hasModeration}
        onAccept={onEntryAccept}
        onDecline={onEntryDecline}
      />
    </span>
  );
}

EntryBrickQuoteType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickQuoteType;
