import React, { Children, PropTypes, cloneElement } from 'react';
import EditorEmbedUrlInsert from './UrlInsert';
import EditorEmbedLoading from './Loading';
import EditorEmbedLoaded from './Loaded';
import { connect } from 'react-redux';
import {
  createEmbed,
  startInsert,
  stopInsert,
} from '../../../actions/EditorActions';

function EditorEmbed(props) {
  const {
    children,
    createEmbed,
    embedHtml,
    embedUrl,
    isFetchingEmbed,
    isInsertingUrl,
    onChangeEmbedUrl,
    onCreate,
    onDelete,
    startInsert,
    stopInsert,
  } = props;

  function handleChangeEmbedUrl(newEmbedUrl) {
    stopInsert();
    onChangeEmbedUrl(newEmbedUrl);

    return createEmbed(newEmbedUrl)
      .then(({ response }) => {
        const { meta, html } = response.result

        return onCreate({
          title: meta && (meta.description || meta.title),
          embedHtml: html,
        });
      })
      .catch(startInsert);
  }

  if (isInsertingUrl) {
    return (
      <EditorEmbedUrlInsert
        onCancel={stopInsert}
        onInsert={handleChangeEmbedUrl}
      />
    );
  } else if (embedHtml) {
    return (
      <EditorEmbedLoaded
        embedHtml={embedHtml}
        isFetchingEmbed={isFetchingEmbed}
        onDelete={onDelete}
      />
    )
  } else if (isFetchingEmbed) {
    return (
      <EditorEmbedLoading embedUrl={embedUrl} />
    )
  } else {
    return (
      <div>
        {Children.map(children, (child) => cloneElement(child, { startInsert }))}
      </div>
    )
  }
}

EditorEmbed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  createEmbed: PropTypes.func.isRequired,
  embedHtml: PropTypes.string,
  embedUrl: PropTypes.string,
  isFetchingEmbed: PropTypes.bool.isRequired,
  isInsertingUrl: PropTypes.bool.isRequired,
  onChangeEmbedUrl: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  startInsert: PropTypes.func.isRequired,
  stopInsert: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isFetchingEmbed: state.editor.get('isFetchingEmbed', false),
    isInsertingUrl: state.editor.get('isInsertingUrl', false),
  }),
  {
    createEmbed,
    startInsert,
    stopInsert,
  }
)(EditorEmbed);
