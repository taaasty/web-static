import React, { PropTypes } from 'react';
import ErrorService from '../../../../shared/react/services/Error';
import EntryTlogTextType from './EntryTlogTextType';
import EntryTlogImageType from './EntryTlogImageType';
import EntryTlogVideoType from './EntryTlogVideoType';
import EntryTlogQuoteType from './EntryTlogQuoteType';
import EntryTlogLinkType from './EntryTlogLinkType';
import EntryTlogSongType from './EntryTlogSongType';
import EntryTlogCodeType from './EntryTlogCodeType';
import EntryTlogUnknownType from './EntryTlogUnknownType';
import { onlyUpdateForKeys } from 'recompose';

const ENTRY_TEXT_TYPE = 'text',
      ENTRY_IMAGE_TYPE = 'image',
      ENTRY_VIDEO_TYPE = 'video',
      ENTRY_QUOTE_TYPE = 'quote',
      ENTRY_LINK_TYPE = 'link',
      ENTRY_SONG_TYPE = 'song',
      ENTRY_CODE_TYPE = 'code',
      ENTRY_CONVO_TYPE = 'convo',
      ENTRY_ANONYMOUS_TYPE = 'anonymous';

function EntryTlogContent(props) {
  const {
    entry,
  } = props;

  switch(entry.get('type')) {
  case ENTRY_TEXT_TYPE:
  case ENTRY_ANONYMOUS_TYPE:
  case ENTRY_CONVO_TYPE:
    return <EntryTlogTextType {...props} />;
  case ENTRY_IMAGE_TYPE:
    return <EntryTlogImageType {...props} />;
  case ENTRY_VIDEO_TYPE:
    return <EntryTlogVideoType {...props} />;
  case ENTRY_QUOTE_TYPE:
    return <EntryTlogQuoteType {...props} />;
  case ENTRY_LINK_TYPE:
    return <EntryTlogLinkType {...props} />;
  case ENTRY_SONG_TYPE:
    return <EntryTlogSongType {...props} />;
  case ENTRY_CODE_TYPE:
    return <EntryTlogCodeType {...props} />;
  default:
    ErrorService.notifyWarning('Неизвестный тип tlog-поста', {
      componentName: 'EntryTlogContent',
      method: 'render',
      entryID: entry.get('id'),
      entryType: entry.get('type'),
    });

    return <EntryTlogUnknownType {...props} />;
  }
}

EntryTlogContent.propTypes = {
  commentator: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryState: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  entryTlogAuthor: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  hostTlogId: PropTypes.number,
  isFormHidden: PropTypes.bool,
  isInList: PropTypes.bool,
};

export default onlyUpdateForKeys([
  'commentator',
  'entry',
  'entryAuthor',
  'entryTlog',
  'entryTlogAuthor',
  'entryState',
  'hasModeration',
  'hostTlogId',
  'isFormHidden',
  'isInList',
])(EntryTlogContent);
