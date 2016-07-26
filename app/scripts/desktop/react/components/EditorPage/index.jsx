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
} from '../../actions/EditorActions';
import { tlogEntriesInvalidate } from '../../actions/TlogEntriesActions';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import EditorActionCreators from '../../actions/editor';
import {
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_ANONYMOUS,
  EDITOR_ENTRY_TYPES,
} from '../../constants/EditorConstants';

class EditorPage extends Component {
  componentWillMount() {
    const {
      appStateStartEditing,
      editorSetEntry,
      editorSetPreview,
      entry,
      location: { hash='' },
      routeParams: { editId },
    } = this.props;
    const entryType = hash.substr(1);

    appStateStartEditing();
    editorSetPreview(false);
    if (editId) {
      editorSetEntry(entry);
    } else if (EDITOR_ENTRY_TYPES.indexOf(entryType) > -1) {
      EditorActionCreators.changeEntryType(entryType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      editorSetEntry,
      location: { hash='' },
      routeParams: { editId },
    } = this.props;
    const {
      entry: nextEntry,
      location: { hash: nextHash='' },
      routeParams: { editId: nextEditId },
    } = nextProps;
    const nextEntryType = nextHash.substr(1);
    const entryType = hash.substr(1);

    if (nextEditId && editId !== nextEditId) {
      editorSetEntry(nextEntry);
    } else if (entryType !== nextEntryType && EDITOR_ENTRY_TYPES.indexOf(nextEntryType) > -1) {
      EditorActionCreators.changeEntryType(nextEntryType);
    }
  }
  componentWillUnmount() {
    const { appStateStopEditing, editorResetEntry } = this.props;

    appStateStopEditing();
    editorResetEntry();
  }
  renderContents() {
    const {
      entry,
      editorTogglePreview,
      location,
      routeParams: { editId },
      tlog: {
        data: tlog,
        isFetching,
      },
      tlogEntries,
      tlogEntriesInvalidate,
    } = this.props;
    const tlogType = tlog.slug === TLOG_SLUG_ANONYMOUS
            ? TLOG_TYPE_ANONYMOUS
            : tlog.is_privacy ? TLOG_TYPE_PRIVATE : TLOG_TYPE_PUBLIC;

    return (
      <div className="content-area">
        <div className="content-area__bg" style={{ opacity: tlog.design.feedOpacity }} />
        <div className="content-area__inner">
          {isFetching
           ? <Spinner size={30} />
           : editId
             ? entry
               ? <EditorEdit
                   entry={entry}
                   location={location}
                   tlog={tlog}
                   tlogEntries={tlogEntries}
                   tlogEntriesInvalidate={tlogEntriesInvalidate}
                   tlogType={tlogType}
                   togglePreview={editorTogglePreview}
                 />
               : <Spinner size={30} />
             : <EditorNew
                 location={location}
                 tlog={tlog}
                 tlogEntries={tlogEntries}
                 tlogEntriesInvalidate={tlogEntriesInvalidate}
                 tlogType={tlogType}
                 togglePreview={editorTogglePreview}
               />
          }
        </div>
      </div>
    );

  }
  render() {
    const { author } = this.props.tlog.data;

    return (
      <div className="page-body">
        <Helmet title={i18n.t('editor.title')} />
        {author && author.is_flow
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
  editorResetEntry: PropTypes.func.isRequired,
  editorSetEntry: PropTypes.func.isRequired,
  editorSetPreview: PropTypes.func.isRequired,
  editorTogglePreview: PropTypes.func.isRequired,
  entry: PropTypes.object,
  location: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntriesInvalidate: PropTypes.func.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    entry: state.editor.entry,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries,
    tlogEntry: state.tlogEntry.data,
  }),
  {
    appStateStartEditing,
    appStateStopEditing,
    editorResetEntry,
    editorSetEntry,
    editorSetPreview,
    editorTogglePreview,
    tlogEntriesInvalidate,
  }
)(EditorPage);
