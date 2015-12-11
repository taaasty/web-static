import React, { PropTypes } from 'react';

import {
  TLOG_ENTRY_TYPE_TEXT,
  TLOG_ENTRY_TYPE_IMAGE,
  TLOG_ENTRY_TYPE_VIDEO,
  TLOG_ENTRY_TYPE_QUOTE,
  TLOG_ENTRY_TYPE_ANONYMOUS,
} from '../../../../../shared/constants/TlogEntry';

import TextEntryContent from './text/text';
import ImageEntryContent from './image/image';
import VideoEntryContent from './video/video';
import QuoteEntryContent from './quote/quote';
import UnknownEntryContent from './unknown/unknown';

class EntryContent {
  render() {
    const { image_attachments, iframely, image_url, source, title, text, type } = this.props.entry;
    
    switch (type) {
    case TLOG_ENTRY_TYPE_TEXT:
    case TLOG_ENTRY_TYPE_ANONYMOUS:
      return <TextEntryContent text={text} title={title} />;
    case TLOG_ENTRY_TYPE_IMAGE:
      return (
        <ImageEntryContent
          imageAttachments={image_attachments}
          imageUrl={image_url}
          title={title}
        />
      );
    case TLOG_ENTRY_TYPE_VIDEO:
      return <VideoEntryContent iframely={iframely} />;
    case TLOG_ENTRY_TYPE_QUOTE:
      return <QuoteEntryContent source={source} text={text} />;
    default:
      return <UnknownEntryContent title={title} />;
    };
  }
}

EntryContent.propTypes = {
  entry: PropTypes.object.isRequired,
};
    
export default EntryContent;
