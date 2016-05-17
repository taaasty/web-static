import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickCodeType({ entry, hasModeration, hostTlogId, onEntryAccept, onEntryDecline }) {
  function renderBrickTitle() {
    return (
      <Link
        className="brick__link"
        title={entry.title}
        to={{ pathname: uri(entry.url).path(), state: { id: entry.id }}}
      >
        <h2 className="brick__title">
          {entry.title}
        </h2>
      </Link>
    );
  }

  function renderContents() {
    return (
      <Link
        className="brick__link"
        title={entry.title}
        to={{ pathname: uri(entry.url).path(), state: { id: entry.id }}}
      >
        <pre>
          <Text value={entry.textTruncated} withHTML />
        </pre>
      </Link>
    );
  }

  return (
    <span>
      <div className="brick__body">
        {entry.title && renderBrickTitle()}
        <div className="brick__text">
          {renderContents()}
        </div>
      </div>
      <div className="brick__meta">
        <EntryBrickMetabar entry={entry} hostTlogId={hostTlogId} />
      </div>
      <EntryBrickActions
        hasModeration={hasModeration}
        onAccept={onEntryAccept}
        onDecline={onEntryDecline}
      />
    </span>
  );
}

EntryBrickCodeType.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickCodeType;
