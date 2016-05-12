import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickQuoteType({ entry, hasModeration, hostTlogId, onEntryAccept, onEntryDecline, onVote }) {
  function renderQuoteSource() {
    return (
      <span className="blockquote__caption">—
        <span className="blockquote__source">
          <i>{entry.sourceTruncated}</i>
        </span>
      </span>
    );
  }

  function renderContents() {
    return (
      <Link className="brick__link" to={{ pathname: uri(entry.url).path(), state: { id: entry.id} }}>
        <blockquote className="blockquote">
          <span className="laquo">«</span>
          {entry.textTruncated}
          <span className="raquo">»</span>
          {entry.sourceTruncated && renderQuoteSource()}
        </blockquote>
      </Link>
    );
  }

  return (
    <span>
      <div className="brick__body">
        {renderContents()}
      </div>
      <div className="brick__meta">
        <EntryBrickMetabar
          entry={entry}
          hostTlogId={hostTlogId}
          onVote={onVote}
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
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default EntryBrickQuoteType;
