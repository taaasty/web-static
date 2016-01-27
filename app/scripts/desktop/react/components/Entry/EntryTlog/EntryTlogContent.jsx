import React, { PropTypes } from 'react';
import ErrorService from '../../../../../shared/react/services/Error';
import EntryTlogTextType from './EntryTlogTextType';
import EntryTlogImageType from './EntryTlogImageType';
import EntryTlogVideoType from './EntryTlogVideoType';
import EntryTlogQuoteType from './EntryTlogQuoteType';
import EntryTlogLinkType from './EntryTlogLinkType';
import EntryTlogSongType from './EntryTlogSongType';
import EntryTlogCodeType from './EntryTlogCodeType';
import EntryTlogUnknownType from './EntryTlogUnknownType';

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
  switch(props.entry.type) {
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
      componentName: this.constructor.name,
      method: 'render',
      entryID: props.entry.id,
      entryType: props.entry.type,
    });
    
    return <EntryTlogUnknownType {...props} />;
  }
}

EntryTlogContent.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool,
};

export default EntryTlogContent;
