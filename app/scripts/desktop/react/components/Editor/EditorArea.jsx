import React, { Component, PropTypes } from 'react';
import {
  EDITOR_ENTRY_TYPE_TEXT,
  EDITOR_ENTRY_TYPE_ANONYMOUS,
  EDITOR_ENTRY_TYPE_IMAGE,
  EDITOR_ENTRY_TYPE_INSTAGRAM,
  EDITOR_ENTRY_TYPE_MUSIC,
  EDITOR_ENTRY_TYPE_VIDEO,
  EDITOR_ENTRY_TYPE_QUOTE,
} from '../../constants/EditorConstants';
import EditorTypeText from './types/Text';
//import EditorTypeImage from './types/Image';
//import EditorTypeInstagram from './types/Instagram';
//import EditorTypeMusic from './types/Music';
//import EditorTypeVideo from './types/Video';
//import EditorTypeQuote from './types/Quote';
import {
  getNormalizedKey,
} from '../../services/EntryNormalizationService';

class EditorArea extends Component {
  renderEditor() {
    const { entryType, updateEntry } = this.props;
    let Component;

    switch(entryType) {
    case EDITOR_ENTRY_TYPE_TEXT:
    case EDITOR_ENTRY_TYPE_ANONYMOUS:
      const normTitleKey = getNormalizedKey(entryType, 'title');
      const normTextKey = getNormalizedKey(entryType, 'text');

      return (
        <EditorTypeText
          changeText={updateEntry.bind(null, normTextKey)}
          changeTitle={updateEntry.bind(null, normTitleKey)}
          text={entry.get(normTextKey)}
          title={entry.get(normTitleKey)}
        />
      );
      /*
    case EDITOR_ENTRY_TYPE_IMAGE:
      Component = EditorTypeImage;
      break;
    case EDITOR_ENTRY_TYPE_INSTAGRAM:
      Component = EditorTypeInstagram;
      break;
    case EDITOR_ENTRY_TYPE_MUSIC:
      Component = EditorTypeMusic;
      break;
    case EDITOR_ENTRY_TYPE_VIDEO:
      Component = EditorTypeVideo;
      break;
    case EDITOR_ENTRY_TYPE_QUOTE:
      Component = EditorTypeQuote;
      break;
      */
    default:
      console.warn('Unknown type of normalized entry', entryType);
    }

    return <Component {...this.props} />;
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
  isFetching: PropTypes.bool.isRequired,
  updateEntry: PropTypes.func.isRequired,
}

export default EditorArea;
