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

export default class EntryTlogContent {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    hasModeration: PropTypes.bool
  }
  render() {
    switch(this.props.entry.type) {
      case ENTRY_TEXT_TYPE:
      case ENTRY_ANONYMOUS_TYPE:
      case ENTRY_CONVO_TYPE:
        return <EntryTlogTextType {...this.props} />;
      case ENTRY_IMAGE_TYPE:
        return <EntryTlogImageType {...this.props} />;
      case ENTRY_VIDEO_TYPE:
        return <EntryTlogVideoType {...this.props} />;
      case ENTRY_QUOTE_TYPE:
        return <EntryTlogQuoteType {...this.props} />;
      case ENTRY_LINK_TYPE:
        return <EntryTlogLinkType {...this.props} />;
      case ENTRY_SONG_TYPE:
        return <EntryTlogSongType {...this.props} />;
      case ENTRY_CODE_TYPE:
        return <EntryTlogCodeType {...this.props} />;
      default:
        ErrorService.notifyWarning('Неизвестный тип tlog-поста', {
          componentName: this.constructor.name,
          method: 'render',
          entryID: this.props.entry.id,
          entryType: this.props.entry.type
        });

        return <EntryTlogUnknownType {...this.props} />;
    }
  }
}