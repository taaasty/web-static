/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import EditorNew from '../Editor/EditorNew';
import EditorEdit from '../Editor/EditorEdit';
import Spinner from '../../../../shared/react/components/common/Spinner';
import {
  appStateStartEditing,
  appStateStopEditing,
} from '../../actions/AppStateActions';
import {
  editorResetEntry,
  editorSetEntry,
  editorSetPreview,
  editorTogglePreview,
  changeEntryType,
} from '../../actions/EditorActions';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import {
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_ANONYMOUS,
  EDITOR_ENTRY_TYPES,
} from '../../constants/EditorConstants';
import { Map } from 'immutable';

const emptyEntry = Map();
const emptyTlog = Map();

class EditorPage extends Component {
  componentWillMount() {
    const {
      appStateStartEditing,
      editId,
      editorSetEntry,
      editorSetPreview,
      entry,
      entryType,
      tlogType,
    } = this.props;

    appStateStartEditing();
    editorSetPreview(false);
    if (editId) {
      editorSetEntry(entry, tlogType);
    } else if (EDITOR_ENTRY_TYPES.indexOf(entryType) > -1) {
      changeEntryType(entryType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      editId,
      editorSetEntry,
      entryType,
    } = this.props;
    const {
      editId: nextEditId,
      entry: nextEntry,
      entryType: nextEntryType,
      tlogType: nextTlogType,
    } = nextProps;

    if (nextEditId && editId !== nextEditId) {
      editorSetEntry(nextEntry, nextTlogType);
    } else if (entryType !== nextEntryType && EDITOR_ENTRY_TYPES.indexOf(nextEntryType) > -1) {
      changeEntryType(nextEntryType);
    }
  }
  componentWillUnmount() {
    const { appStateStopEditing, editorResetEntry } = this.props;

    appStateStopEditing();
    editorResetEntry();
  }
  renderContents() {
    const {
      editId,
      editorTogglePreview,
      entry,
      isFetchingTlog,
      pathname,
      tlog,
    } = this.props;

    return (
      <div className="content-area">
        <div className="content-area__bg" style={{ opacity: tlog.design.feedOpacity }} />
        <div className="content-area__inner">
          {isFetchingTlog
           ? <Spinner size={30} />
           : editId
             ? !entry.isEmpty()
               ? <EditorEdit
                   entry={entry}
                   pathname={pathname}
                   tlog={tlog}
                   tlogType={tlogType}
                   togglePreview={editorTogglePreview}
                 />
               : <Spinner size={30} />
             : <EditorNew
                 pathname={pathname}
                 tlog={tlog}
                 tlogType={tlogType}
                 togglePreview={editorTogglePreview}
               />
          }
        </div>
      </div>
    );

  }
  render() {
    const { tlog } = this.props;

    return (
      <div className="page-body">
        <Helmet title={i18n.t('editor.title')} />
        {!tlog.isEmpty() && tlog.get('isFlow')
         ? <div className="layout-outer">
             {this.renderContents()}
           </div>
         : this.renderContents()
        }
      </div>
    );
  }
}

EditorPage.displayName = 'EditorPage';

EditorPage.propTypes = {
  appStateStartEditing: PropTypes.func.isRequired,
  appStateStopEditing: PropTypes.func.isRequired,
  editId: PropTypes.string,
  editorResetEntry: PropTypes.func.isRequired,
  editorSetEntry: PropTypes.func.isRequired,
  editorSetPreview: PropTypes.func.isRequired,
  editorTogglePreview: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryType: PropTypes.string.isRequired,
  isFetchingTlog: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_ANONYMOUS,
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_PUBLIC,
  ]).isRequired,
};

export default connect(
  (state, ownProps) => {
    const entry = state.editor.get('entry', emptyEntry);
    const {
      params: { slug },
      routeParams: { editId },
      location: { hash, pathname },
     } = ownProps;
    const { entryType } = (hash || '').substr(1);
    const tlog = entities.get('tlog').find((t) => t.get('slug') === slug, null, emptyTlog);
    const isFetchingTlog = state.tlog.isFetching;
    const tlogType = slug === TLOG_SLUG_ANONYMOUS
      ? TLOG_TYPE_ANONYMOUS
      : tlog.get('isPrivacy') ? TLOG_TYPE_PRIVATE : TLOG_TYPE_PUBLIC;

    return {
      editId,
      entry,
      entryType,
      isFetchingTlog,
      pathname,
      tlog,
      tlogType,
    };
  },
  {
    appStateStartEditing,
    appStateStopEditing,
    editorResetEntry,
    editorSetEntry,
    editorSetPreview,
    editorTogglePreview,
    changeEntryType,
  }
)(EditorPage);
