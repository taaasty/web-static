/*global i18n */
import React, { PropTypes } from 'react';
import EditorTextField from '../Field/Text';
import { connect } from 'react-redux';
import {
  updateEntry,
} from '../../../actions/EditorActions';
import {
  EDITOR_ENTRY_TYPE_TEXT,
} from '../../../constants/EditorConstants';
import {
  getNormalizedKey,
} from '../../../services/EntryNormalizationService';

function EditorTypeText({ changeText, changeTitle, title, text }) {
  return (
    <article className="post post--text post--edit">
      <header className="post__header">
        <EditorTextField
          className="post__title"
          onChange={changeTitle}
          placeholder={i18n.t('editor_title_placeholder')}
          text={title}
        />
      </header>
      <EditorTextField
        className="post__content"
        mode="rich"
        onChange={changeText}
        placeholder={i18n.t('editor_text_placeholder')}
        text={text}
      />
    </article>
);
}

EditorTypeText.propTypes = {
  changeText: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
};

const textKey = getNormalizedKey(EDITOR_ENTRY_TYPE_TEXT, 'text');
const titleKey = getNormalizedKey(EDITOR_ENTRY_TYPE_TEXT, 'title');

export default connect(
  (state) => ({
    text: state.editor.getIn([ 'entry', textKey ], ''),
    title: state.editor.getIn([ 'entry', titleKey ], ''),
  }),
  {
    updateEntry,
  },
  (stateProps, dispatchProps) => (
    Object.assign({}, stateProps, {
      changeText: dispatchProps.updateEntry.bind(null, textKey),
      changeTitle: dispatchProps.updateEntry.bind(null, titleKey),
    })
  )
)(EditorTypeText);
