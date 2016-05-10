/*global i18n */
import React, { PropTypes } from 'react';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickUnknownType({ entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline }) {
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
        {i18n.t('entry.unknown_type')}
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
        <EntryBrickMetabar entry={entry} host_tlog_id={host_tlog_id} />
      </div>
      <EntryBrickActions
        hasModeration={hasModeration}
        onAccept={onEntryAccept}
        onDecline={onEntryDecline}
      />
    </span>
  );
}

EntryBrickUnknownType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickUnknownType;
