/*global i18n */
import React, { PropTypes } from 'react';
import Text from '../../../../../shared/react/components/common/Text';
import LazyLoadImage from '../../../../../shared/react/components/common/LazyLoadImage';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';

function EntryBrickImageType({ entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline }) {
  function renderBrickImage() {
    return entry.preview_image
      ?  <LazyLoadImage image={entry.preview_image} maxWidth={brickWidth} />
      :  <span>{i18n.t('entry.has_no_images')}</span>;
  }

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
        <a className="brick__link" href={entry.url}>
          {renderBrickImage()}
        </a>
      </div>
      {entry.titly_truncated && renderBrickBody()}
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

EntryBrickImageType.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  host_tlog_id: PropTypes.number,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickImageType;
