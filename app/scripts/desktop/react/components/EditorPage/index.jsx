/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import EditorContainer from '../Editor/EditorContainer';
import Spinner from '../../../../shared/react/components/common/Spinner';
import { getTlogEntry } from '../../actions/TlogEntryActions';
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
import {
  normalize,
} from '../../services/EntryNormalizationService';
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
      editorSetPreview,
      getTlogEntry,
      hashEntryType,
      sourceEntry,
      tlogType,
    } = this.props;

    appStateStartEditing();
    editorSetPreview(false);
    this.setEntry(sourceEntry, tlogType);

    if (editId && sourceEntry.isEmpty()) {
      getTlogEntry(editId);
    }

    if (EDITOR_ENTRY_TYPES.indexOf(hashEntryType) > -1) {
      changeEntryType(hashEntryType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      getTlogEntry,
      hashEntryType,
      sourceEntry,
    } = this.props;
    const {
      editId: nextEditId,
      hashEntryType: nextHashEntryType,
      sourceEntry: nextSourceEntry,
      tlogType: nextTlogType,
    } = nextProps;

    if (sourceEntry.get('id') !== nextSourceEntry.get('id')) {
      if (nextEditId && nextSourceEntry.isEmpty()) {
        getTlogEntry(nextEditId);
      }

      this.setEntry(nextSourceEntry, nextTlogType);
    } else if (hashEntryType !== nextHashEntryType &&
        EDITOR_ENTRY_TYPES.indexOf(nextHashEntryType) > -1) {
      changeEntryType(nextHashEntryType);
    }
  }
  componentWillUnmount() {
    const { appStateStopEditing, editorResetEntry } = this.props;

    appStateStopEditing();
    editorResetEntry();
  }
  setEntry(entry, type) {
    return this.props.editorSetEntry(normalize(entry.toJS()), type);
  }
  renderContents() {
    const {
      editId,
      editorTogglePreview,
      entry,
      isFetchingTlog,
      pathname,
      sourceEntry,
      tlog,
      tlogType,
    } = this.props;
    const styles = {
      opacity: tlog.getIn([ 'design', 'feedOpacity' ], '1.0'),
    };

    return (
      <div className="content-area">
        <div className="content-area__bg" style={styles} />
        <div className="content-area__inner">
          {isFetchingTlog || (editId && sourceEntry.isEmpty()) || entry.isEmpty()
           ? <Spinner size={30} />
           : <EditorContainer
               canChangeType={!editId}
               entry={entry}
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
  getTlogEntry: PropTypes.func.isRequired,
  hashEntryType: PropTypes.string,
  isFetchingTlog: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  sourceEntry: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_ANONYMOUS,
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_PUBLIC,
  ]).isRequired,
};

export default connect(
  (state, ownProps) => {
    const {
      params: { slug },
      route: { isAnonymousTlog },
      routeParams: { editId },
      location: { hash, pathname },
     } = ownProps;
    const { hashEntryType } = (hash || '').substr(1);
    const sourceEntry = state
      .entities
      .getIn([ 'entry', String(editId) ], emptyEntry);
    const entry = state.editor.get('entry', emptyEntry);
    const tlog = state
      .entities
      .get('tlog')
      .find((t) => t.get('slug') === slug, null, emptyTlog);
    const isFetchingTlog = state.tlog.isFetching;
    const tlogType = isAnonymousTlog
      ? TLOG_TYPE_ANONYMOUS
      : tlog.get('isPrivacy') ? TLOG_TYPE_PRIVATE : TLOG_TYPE_PUBLIC;

    return {
      editId,
      entry,
      hashEntryType,
      isFetchingTlog,
      pathname,
      sourceEntry,
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
    getTlogEntry,
  }
)(EditorPage);
