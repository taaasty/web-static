/*global i18n */
import React, { PropTypes } from 'react';
import EditorTextField from '../../Field/Text';
import EditorEmbed from '../../Embed';
import EditorTypeInstagramWelcome from './Welcome';
import striptags from 'striptags';
import {
  EDITOR_ENTRY_TYPE_INSTAGRAM,
} from '../../../../constants/EditorConstants';
import {
  updateEntry,
} from '../../../../actions/EditorActions';
import {
  getNormalizedKey,
} from '../../../../services/EntryNormalizationService';
import { connect } from 'react-redux';

function EditorTypeInstagram(props) {
  const {
    changeTitle,
    changeEmbedHtml,
    changeEmbedUrl,
    deleteEmbed,
    embedHtml,
    embedUrl,
    title,
   } = props;

  function handleCreateEmbed({ embedHtml: newEmbedHtml, title: newTitle }) {
    changeEmbedHtml(newEmbedHtml);
    // Перезаписываем title описание с iframely, только если он пустой либо с тегами без контента
    if (!striptags(title)) {
      changeTitle(newTitle);
    }
  }

  return (
    <article className="post post--video post--edit">
      <div className="post__content">
        <EditorEmbed
          embedHtml={embedHtml}
          embedUrl={embedUrl}
          onChangeEmbedUrl={changeEmbedUrl}
          onCreate={handleCreateEmbed}
          onDelete={deleteEmbed}
        >
          <EditorTypeInstagramWelcome />
        </EditorEmbed>
        <EditorTextField
          mode="partial"
          onChange={changeTitle}
          placeholder={i18n.t('editor_description_placeholder')}
          text={title}
        />
      </div>
    </article>
  );
}

EditorTypeInstagram.propTypes = {
  changeEmbedHtml: PropTypes.func.isRequired,
  changeEmbedUrl: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  deleteEmbed: PropTypes.func.isRequired,
  embedHtml: PropTypes.string,
  embedUrl: PropTypes.string,
  title: PropTypes.string,
};

const titleKey = getNormalizedKey(EDITOR_ENTRY_TYPE_INSTAGRAM, 'title');
const embedUrlKey = getNormalizedKey(EDITOR_ENTRY_TYPE_INSTAGRAM, 'embedUrl');
const embedHtmlKey = getNormalizedKey(EDITOR_ENTRY_TYPE_INSTAGRAM, 'embedHtml');

export default connect(
  (state) => ({
    embedHtml: state.editor.getIn(['entry', embedHtmlKey], ''),
    embedUrl: state.editor.getIn(['entry', embedUrlKey], ''),
    title: state.editor.getIn(['entry', titleKey], ''),
  }),
  {
    updateEntry,
  },
  (stateProps, dispatchProps) => Object.assign({}, stateProps, {
    changeTitle: dispatchProps.updateEntry.bind(null, titleKey),
    changeEmbedUrl: dispatchProps.updateEntry.bind(null, embedUrlKey),
    changeEmbedHtml: dispatchProps.updateEntry.bind(null, embedHtmlKey),
    deleteEmbed: () => {
      dispatchProps.updateEntry(embedUrlKey, null);
      dispatchProps.updateEntry(embedHtmlKey, null);
    },
  })
)(EditorTypeInstagram)
