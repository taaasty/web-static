/*global i18n */
import React, { PropTypes } from 'react';
import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickImageType({ entry, hasModeration, host_tlog_id, isFeed, onEntryAccept, onEntryDecline }) {
  function renderBrickImage() {
    return entry.preview_image
      ?  <Image image={entry.preview_image} maxWidth={brickWidth} />
      :  <span>{i18n.t('entry.has_no_images')}</span>;
  }

  function renderBrickImageContainer() {
    return (
      <Link className="brick__link" to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id } }}>
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
            title={entry.title_truncated}
            to={{ pathname: uri(entry.url).path(), state: { isFeed, id: entry.id }}}
          >
            <Text value={entry.title_truncated} withHTML />
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

EntryBrickImageType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickImageType;
