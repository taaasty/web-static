import React, { Component, PropTypes } from 'react';
import {
  TLOG_ENTRY_TYPE_TEXT,
  TLOG_ENTRY_TYPE_ANONYMOUS,
  TLOG_ENTRY_TYPE_IMAGE,
  TLOG_ENTRY_TYPE_INSTAGRAM,
  TLOG_ENTRY_TYPE_MUSIC,
  TLOG_ENTRY_TYPE_VIDEO,
  TLOG_ENTRY_TYPE_QUOTE,
} from '../../../../shared/constants/TlogEntry';

import EditorTypeText from './types/Text';
import EditorTypeImage from './types/Image';
import EditorTypeInstagram from './types/Instagram';
import EditorTypeMusic from './types/Music';
import EditorTypeVideo from './types/Video';
import EditorTypeQuote from './types/Quote';

class EditorArea extends Component {
  renderEditor() {
    const { entry, entryType, loading } = this.props;
    const props = { entry, entryType, loading };
    let Component;

    switch(entryType) {
    case TLOG_ENTRY_TYPE_TEXT:
    case TLOG_ENTRY_TYPE_ANONYMOUS:
      Component = EditorTypeText;
      break;
    case TLOG_ENTRY_TYPE_IMAGE:
      Component = EditorTypeImage;
      break;
    case TLOG_ENTRY_TYPE_INSTAGRAM:
      Component = EditorTypeInstagram;
      break;
    case TLOG_ENTRY_TYPE_MUSIC:
      Component = EditorTypeMusic;
      break;
    case TLOG_ENTRY_TYPE_VIDEO:
      Component = EditorTypeVideo;
      break;
    case TLOG_ENTRY_TYPE_QUOTE:
      Component = EditorTypeQuote;
      break;
    default:
      console.warn('Unknown type of normalized entry', entryType);
    }

    return <Component {...props} />;
  }
  render() {
    return (
      <section className="posts posts--edit">
        {this.renderEditor()}
      </section>
    );
  }
}

EditorArea.propTypes = {
  entry: PropTypes.object.isRequired,
  entryPrivacy: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default EditorArea;
