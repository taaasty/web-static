import React, { PropTypes } from 'react';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickQuoteType(props) {
  const {
    entry,
    entryAuthor,
    entryTlog,
    hasModeration,
    hostTlogId,
    onEntryAccept,
    onEntryDecline,
  } = props;
  const id = entry.get('id');
  const url = entry.get('url', entry.get('entryUrl'));
  const textTruncated = entry.get('textTruncated');
  const sourceTruncated = entry.get('sourceTruncated');

  function renderQuoteSource() {
    return (
      <span className="blockquote__caption">—
        <span className="blockquote__source">
          <i>
            {sourceTruncated}
          </i>
        </span>
      </span>
    );
  }

  function renderContents() {
    return (
      <Link className="brick__link" to={{ pathname: uri(url).path(), state: { id } }}>
        <blockquote className="blockquote">
          <span className="laquo">«</span>
          {textTruncated}
          <span className="raquo">»</span>
          {sourceTruncated && renderQuoteSource()}
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
          entryAuthor={entryAuthor}
          entryTlog={entryTlog}
          hostTlogId={hostTlogId}
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
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickQuoteType;
