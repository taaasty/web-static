
import React, { PropTypes } from 'react';
import EditorTextField from '../Field/Text';

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
}
module.exports = EditorTypeText
