import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import Text from '../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickTextType({ entry, hasModeration, host_tlog_id, isFeed, onEntryAccept, onEntryDecline }) {
  function renderBrickTitle() {
    return (
      <Link
        className="brick__link"
        title={entry.title}
        to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
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
        to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
      >
        <Text value={entry.text_truncated} withHTML />
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
        <EntryBrickMetabar
          entry={entry}
          host_tlog_id={host_tlog_id}
          isFeed={isFeed}
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

EntryBrickTextType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickTextType;
