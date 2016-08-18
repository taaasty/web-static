import React, { PropTypes } from 'react';
import ErrorService from '../../../../shared/react/services/Error';
import EntryBrickTextType from './EntryBrickTextType';
import EntryBrickImageType from './EntryBrickImageType';
import EntryBrickVideoType from './EntryBrickVideoType';
import EntryBrickQuoteType from './EntryBrickQuoteType';
import EntryBrickLinkType from './EntryBrickLinkType';
import EntryBrickSongType from './EntryBrickSongType';
import EntryBrickCodeType from './EntryBrickCodeType';
import EntryBrickUnknownType from './EntryBrickUnknownType';
import {
  ENTRY_TYPE_TEXT,
  ENTRY_TYPE_ANONYMOUS,
  ENTRY_TYPE_CONVO,
  ENTRY_TYPE_IMAGE,
  ENTRY_TYPE_VIDEO,
  ENTRY_TYPE_QUOTE,
  ENTRY_TYPE_LINK,
  ENTRY_TYPE_SONG,
  ENTRY_TYPE_CODE,
} from '../../constants/EntryConstants';

function EntryBrickContent(props) {
  const {
    entry,
  } = props;

  switch(entry.get('type')) {
  case ENTRY_TYPE_TEXT:
  case ENTRY_TYPE_ANONYMOUS:
  case ENTRY_TYPE_CONVO:
    return <EntryBrickTextType {...props} />;
  case ENTRY_TYPE_IMAGE:
    return <EntryBrickImageType {...props} />;
  case ENTRY_TYPE_VIDEO:
    return <EntryBrickVideoType {...props} />;
  case ENTRY_TYPE_QUOTE:
    return <EntryBrickQuoteType {...props} />;
  case ENTRY_TYPE_LINK:
    return <EntryBrickLinkType {...props} />;
  case ENTRY_TYPE_SONG:
    return <EntryBrickSongType {...props} />;
  case ENTRY_TYPE_CODE:
    return <EntryBrickCodeType {...props} />;
  default:
    ErrorService.notifyWarning('Неизвестный тип brick-поста', {
      componentName: this.constructor.displayName,
      method: 'render',
      entryID: entry.get('id'),
      entryType: entry.get('type'),
    });
    return <EntryBrickUnknownType {...props} />;
  }
}

EntryBrickContent.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryState: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired,
};

export default EntryBrickContent;
