import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickCodeType({ entry, hasModeration, host_tlog_id, isFeed, onEntryAccept, onEntryDecline }) {
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
          href={entry.url}
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
          <pre>
            <Text value={entry.text_truncated} withHTML />
          </pre>
        </Link>
      : <a
          className="brick__link"
          href={entry.url}
          title={entry.title}
        >
          <pre>
            <Text value={entry.text_truncated} withHTML />
          </pre>
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

EntryBrickCodeType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickCodeType;
