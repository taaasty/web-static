/*global i18n */
import React, { PropTypes } from 'react';
import striptags from 'striptags';
import EditorTextField from '../../Field/Text';
import EditorEmbed from '../../Embed';
import EditorTypeVideoWelcome from './Welcome';
import { connect } from 'react-redux';
import {
  getNormalizedKey,
} from '../../../../services/EntryNormalizationService';
import {
  EDITOR_ENTRY_TYPE_VIDEO,
} from '../../../../constants/EditorConstants';
import {
  updateEntry,
} from '../../../../actions/EditorActions';

function EditorTypeVideo(props) {
  const {
    changeEmbedHtml,
    changeEmbedUrl,
    changeTitle,
    deleteEmbed,
    embedHtml,
    embedUrl,
    title,
  } = props;

  function handleCreateEmbed({ embedHtml: newEmbedHtml, title: newTitle }) {
    changeEmbedHtml(newEmbedHtml);
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
          <EditorTypeVideoWelcome />
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

EditorTypeVideo.propTypes = {
  changeEmbedHtml: PropTypes.func.isRequired,
  changeEmbedUrl: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  deleteEmbed: PropTypes.func.isRequired,
  embedHtml: PropTypes.string,
  embedUrl: PropTypes.string,
  title: PropTypes.string,
};

const embedHtmlKey = getNormalizedKey(EDITOR_ENTRY_TYPE_VIDEO, 'embedHtml');
const embedUrlKey = getNormalizedKey(EDITOR_ENTRY_TYPE_VIDEO, 'embedUrl');
const titleKey = getNormalizedKey(EDITOR_ENTRY_TYPE_VIDEO, 'title');

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
)(EditorTypeVideo);
