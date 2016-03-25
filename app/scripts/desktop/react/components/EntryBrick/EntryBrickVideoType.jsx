import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickVideoType({ entry, hasModeration, host_tlog_id, isFeed, onEntryAccept, onEntryDecline }) {
  function renderBrickBody() {
    return (
      <div className="brick__body">
        <div className="brick__text">
          <Link
            className="brick__link"
            title={entry.title_truncated}
            to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
          >
            <Text value={entry.title_truncated} withHTML />
          </Link>
        </div>
      </div>
    );
  }

  function renderVideo() {
    return (
      <Link to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id } }}>
        <div className="video__cover">
          <Image image={entry.preview_image} maxWidth={brickWidth} />
          {entry.is_playable && <div className="video__overlay" />}
        </div>
      </Link>
    );
  }

  return (
    <span>
      <div className="brick__media">
        <figure className="video">
          {renderVideo()}
        </figure>
      </div>
      {entry.title_truncated && renderBrickBody()}
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

EntryBrickVideoType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickVideoType;
