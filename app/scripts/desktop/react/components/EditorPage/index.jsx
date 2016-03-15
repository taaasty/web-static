import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditorNew from '../Editor/EditorNew';
import EditorEdit from '../Editor/EditorEdit';
import Spinner from '../../../../shared/react/components/common/Spinner';
import {
  appStateSetEditPreview,
  appStateSetEditing,
  appStateToggleEditPreview,
} from '../../actions/AppStateActions';
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
    const { appStateSetEditing, appStateSetEditPreview, location: { hash='' } } = this.props;
    const entryType = hash.substr(1);

    appStateSetEditing(true);
    appStateSetEditPreview(false);
    if (EDITOR_ENTRY_TYPES.indexOf(entryType) > -1) {
      EditorActionCreators.changeEntryType(entryType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { hash: nextHash='' } = nextProps.location;
    const nextEntryType = nextHash.substr(1);

    if (EDITOR_ENTRY_TYPES.indexOf(nextEntryType) > -1) {
      EditorActionCreators.changeEntryType(nextEntryType);
    }
  }
  componentWillUnmount() {
    this.props.appStateSetEditing(false);
  }
  render() {
    const { appStateToggleEditPreview, location, routeParams: { editId },
            tlog: { data: tlog, isFetching }, tlogEntry } = this.props;
    const tlogType = tlog.slug === TLOG_SLUG_ANONYMOUS
            ? TLOG_TYPE_ANONYMOUS
            : tlog.is_privacy ? TLOG_TYPE_PRIVATE : TLOG_TYPE_PUBLIC;

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={{ opacity: tlog.design.feedOpacity }} />
          <div className="content-area__inner">
            {isFetching
             ? <Spinner size={30} />
             : editId
               ? <EditorEdit
                   entry={tlogEntry}
                   location={location}
                   tlog={tlog}
                   tlogType={tlogType}
                   togglePreview={appStateToggleEditPreview}
                 />
               : <EditorNew
                   location={location}
                   tlog={tlog}
                   tlogType={tlogType}
                   togglePreview={appStateToggleEditPreview}
                 />
            }
          </div>
        </div>
      </div>
    );
  }
}

EditorPage.displayName = 'EditorPage';

EditorPage.propTypes = {
  appStateSetEditPreview: PropTypes.func.isRequired,
  appStateSetEditing: PropTypes.func.isRequired,
  appStateToggleEditPreview: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object,
};

export default connect(
  (state) => ({
    tlog: state.tlog,
  }),
  {
    appStateSetEditing,
    appStateSetEditPreview,
    appStateToggleEditPreview,
  }
)(EditorPage);
