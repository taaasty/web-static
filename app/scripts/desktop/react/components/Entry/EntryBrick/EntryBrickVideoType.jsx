import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Text from '../../../../../shared/react/components/common/Text';
import LazyLoadImage from '../../../../../shared/react/components/common/LazyLoadImage';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';

function EntryBrickVideoType({ entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline }) {
  function renderBrickBody() {
    return (
      <div className="brick__body">
        <div className="brick__text">
          <a
            className="brick__link"
            href={entry.url}
            title={entry.title_truncated}
          >
            <Text value={entry.title_truncated} withHTML />
          </a>
        </div>
      </div>
    );
  }

  return (
    <span>
      <div className="brick__media">
        <figure className="video">
          <a href={entry.url}>
            <div className="video__cover">
              <LazyLoadImage image={entry.preview_image} maxWidth={brickWidth} />
              {entry.is_playable && <div className="video__overlay" />}
            </div>
          </a>
        </figure>
      </div>
      {entry.title_truncated && renderBrickBody()}
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

EntryBrickVideoType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickVideoType;
