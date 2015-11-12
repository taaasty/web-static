import React, { PropTypes } from 'react';
import ErrorService from '../../../../../shared/react/services/Error';
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
} from '../../../constants/EntryConstants';

class EntryBrickContent {
  render() {
    const { id, type } = this.props.entry;

    switch(type) {
      case ENTRY_TYPE_TEXT:
      case ENTRY_TYPE_ANONYMOUS:
      case ENTRY_TYPE_CONVO:
        return <EntryBrickTextType {...this.props} />;
      case ENTRY_TYPE_IMAGE:
        return <EntryBrickImageType {...this.props} />;
      case ENTRY_TYPE_VIDEO:
        return <EntryBrickVideoType {...this.props} />;
      case ENTRY_TYPE_QUOTE:
        return <EntryBrickQuoteType {...this.props} />;
      case ENTRY_TYPE_LINK:
        return <EntryBrickLinkType {...this.props} />;
      case ENTRY_TYPE_SONG:
        return <EntryBrickSongType {...this.props} />;
      case ENTRY_TYPE_CODE:
        return <EntryBrickCodeType {...this.props} />;
      default:
        ErrorService.notifyWarning('Неизвестный тип brick-поста', {
          componentName: this.constructor.displayName,
          method: 'render',
          entryID: id,
          entryType: type
        });

        return <EntryBrickUnknownType {...this.props} />;
    }
  }
}

EntryBrickContent.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  onEntryAccept: PropTypes.func.isRequired,
  onEntryDecline: PropTypes.func.isRequired
};

export default EntryBrickContent;
