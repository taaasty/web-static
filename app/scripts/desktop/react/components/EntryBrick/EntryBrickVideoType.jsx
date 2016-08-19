import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickVideoType(props) {
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
  const titleTruncated = entry.get('titleTruncated');
  const previewImage = entry.get('previewImage').toJS();

  function renderBrickBody() {
    return (
      <div className="brick__body">
        <div className="brick__text">
          <Link
            className="brick__link"
            title={titleTruncated}
            to={{ pathname: uri(url).path(), state: { id }}}
          >
            <Text value={titleTruncated} withHTML />
          </Link>
        </div>
      </div>
    );
  }

  function renderVideo() {
    return (
      <Link to={{ pathname: uri(url).path(), state: { id } }}>
        <div className="video__cover">
          <Image image={previewImage} maxWidth={brickWidth} />
          {entry.get('isPlayable') && <div className="video__overlay" />}
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
      {titleTruncated && renderBrickBody()}
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

EntryBrickVideoType.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickVideoType;
