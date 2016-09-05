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
import EditorTypeText from './Type/Text';
import EditorTypeImage from './Type/Image';
import EditorTypeInstagram from './Type/Instagram';
import EditorTypeMusic from './Type/Music';
import EditorTypeVideo from './Type/Video';
import EditorTypeQuote from './Type/Quote';

class EditorArea extends Component {
  renderEditor() {
    const {
      entryType,
     } = this.props;

    switch(entryType) {
    case EDITOR_ENTRY_TYPE_TEXT:
    case EDITOR_ENTRY_TYPE_ANONYMOUS:
      return <EditorTypeText />;
    case EDITOR_ENTRY_TYPE_IMAGE:
      return <EditorTypeImage />;
    case EDITOR_ENTRY_TYPE_INSTAGRAM:
      return <EditorTypeInstagram />;
    case EDITOR_ENTRY_TYPE_MUSIC:
      return <EditorTypeMusic />;
    case EDITOR_ENTRY_TYPE_VIDEO:
      return <EditorTypeVideo />;
    case EDITOR_ENTRY_TYPE_QUOTE:
      return <EditorTypeQuote />;
    }
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
  entryType: PropTypes.string.isRequired,
};

export default EditorArea;
