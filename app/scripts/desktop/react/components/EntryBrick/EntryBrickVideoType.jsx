import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickVideoType({ entry, hasModeration, hostTlogId, onEntryAccept, onEntryDecline }) {
  function renderBrickBody() {
    return (
      <div className="brick__body">
        <div className="brick__text">
          <Link
            className="brick__link"
            title={entry.titleTruncated}
            to={{ pathname: uri(entry.url).path(), state: { id: entry.id }}}
          >
            <Text value={entry.titleTruncated} withHTML />
          </Link>
        </div>
      </div>
    );
  }

  function renderVideo() {
    return (
      <Link to={{ pathname: uri(entry.url).path(), state: { id: entry.id } }}>
        <div className="video__cover">
          <Image image={entry.previewImage} maxWidth={brickWidth} />
          {entry.isPlayable && <div className="video__overlay" />}
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
      {entry.titleTruncated && renderBrickBody()}
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

EntryBrickVideoType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickVideoType;
