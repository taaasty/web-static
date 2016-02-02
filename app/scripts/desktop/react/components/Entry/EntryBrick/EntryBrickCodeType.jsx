import React, { PropTypes } from 'react';
import Text from '../../../../../shared/react/components/common/Text';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

function EntryBrickCodeType({ entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline }) {
  function renderBrickTitle() {
    return (
      <a
        className="brick__link"
        href={entry.url}
        title={entry.title}
      >
        <h2 className="brick__title">
          {entry.title}
        </h2>
      </a>
    );
  }

  return (
    <span>
      <div className="brick__body">
        {entry.title && renderBrickTitle()}
        <div className="brick__text">
          <a className="brick__link"
            href={entry.url}
            title={entry.title}
          >
            <pre>
              <Text value={entry.text_truncated} withHTML />
            </pre>
          </a>
        </div>
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

EntryBrickCodeType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickCodeType;
