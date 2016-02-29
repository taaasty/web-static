/*global i18n */
import React, { PropTypes } from 'react';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickUnknownType({ entry, hasModeration, host_tlog_id, isFeed, onEntryAccept, onEntryDecline }) {
  function renderBrickTitle() {
    return window.SPA
      ? <Link
          className="brick__link"
          title={entry.title}
          to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
        >
          <h2 className="brick__title">
            {entry.title}
          </h2>
        </Link>
      : <a
          className="brick__link"
          href={entry.entry_url}
          title={entry.title}
        >
          <h2 className="brick__title">
            {entry.title}
          </h2>
        </a>;
  }

  function renderContents() {
    return window.SPA
      ? <Link
          className="brick__link"
          title={entry.title}
          to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
        >
          {i18n.t('entry.unknown_type')}
        </Link>
      : <a
          className="brick__link"
          href={entry.url}
          title={entry.title}
        >
          {i18n.t('entry.unknown_type')}
        </a>;
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

EntryBrickUnknownType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickUnknownType;
