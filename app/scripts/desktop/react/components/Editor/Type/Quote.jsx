/*global i18n */
import React, { PropTypes } from 'react';
import EditorTextField from '../Field/Text';
import { connect } from 'react-redux';
import {
  getNormalizedKey,
} from '../../../services/EntryNormalizationService';
import {
  EDITOR_ENTRY_TYPE_QUOTE,
} from '../../../constants/EditorConstants';
import {
  updateEntry,
} from '../../../actions/EditorActions';

function EditorTypeQuote(props) {
  const {
    changeSource,
    changeText,
    source,
    text,
  } = props;

  return (
    <article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <EditorTextField
            onChange={changeText}
            placeholder={i18n.t('editor_quote_text_placeholder')}
            text={text}
          />
          <div className="blockquote__caption">
            <span className="blockquote__dash">
              {'—'}
            </span>
            <EditorTextField
              onChange={changeSource}
              placeholder={i18n.t('editor_quote_source_placeholder')}
              text={source}
            />
          </div>
        </blockquote>
      </div>
    </article>
  );
}

EditorTypeQuote.propTypes = {
  changeSource: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
  source: PropTypes.string,
  text: PropTypes.string,
};

const textKey = getNormalizedKey(EDITOR_ENTRY_TYPE_QUOTE, 'text');
const sourceKey = getNormalizedKey(EDITOR_ENTRY_TYPE_QUOTE, 'source');

export default connect(
  (state) => ({
    source: state.editor.getIn(['entry', sourceKey], ''),
    text: state.editor.getIn(['entry', textKey], ''),
  }),
  { updateEntry },
  (stateProps, dispatchProps) => Object.assign({}, stateProps, {
    changeSource: dispatchProps.updateEntry.bind(null, sourceKey),
    changeText: dispatchProps.updateEntry.bind(null, textKey),
  })
)(EditorTypeQuote);
