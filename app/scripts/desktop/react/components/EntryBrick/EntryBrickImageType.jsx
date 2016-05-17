/*global i18n */
import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickImageType({ entry, hasModeration, hostTlogId, onEntryAccept, onEntryDecline }) {
  function renderBrickImage() {
    return entry.previewImage
      ?  <Image image={entry.previewImage} maxWidth={brickWidth} />
      :  <span>{i18n.t('entry.has_no_images')}</span>;
  }

  function renderBrickImageContainer() {
    return (
      <Link className="brick__link" to={{ pathname: uri(entry.url).path(), state: { id: entry.id } }}>
        {renderBrickImage()}
      </Link>
    );
  }

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

  return (
    <span>
      <div className="brick__media">
        {renderBrickImageContainer()}
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

EntryBrickImageType.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickImageType;
