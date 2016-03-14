import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditorNew from '../Editor/EditorNew';
import EditorEdit from '../Editor/EditorEdit';
import Spinner from '../../../../shared/react/components/common/Spinner';
import { appStateSetEditing } from '../../actions/AppStateActions';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import EditorActionCreators from '../../actions/editor';
import { ENTRY_TYPES } from '../../constants/EntryConstants';

export const TLOG_TYPE_ANONYMOUS = 'anonymous';
export const TLOG_TYPE_PUBLIC = 'public';
export const TLOG_TYPE_PRIVATE = 'private';

class EditorPage extends Component {
  componentWillMount() {
    const { appStateSetEditing, location: { hash='' } } = this.props;
    const entryType = hash.substr(1);

    appStateSetEditing(true);
    if (ENTRY_TYPES.indexOf(entryType) > -1) {
      EditorActionCreators.changeEntryType(entryType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { hash: nextHash='' } = nextProps.location;
    const nextEntryType = nextHash.substr(1);

    if (ENTRY_TYPES.indexOf(nextEntryType) > -1) {
      EditorActionCreators.changeEntryType(nextEntryType);
    }
  }
  componentWillUnmount() {
    this.props.appStateSetEditing(false);
  }
  render() {
    const { routeParams: { editId }, tlog: { data: tlog, isFetching }, tlogEntry } = this.props;
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
                   tlog={tlog}
                   tlogType={tlogType}
                 />
               : <EditorNew
                   tlog={tlog}
                   tlogType={tlogType}
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
  appStateSetEditing: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object,
};

export default connect(
  (state) => ({
    tlog: state.tlog,
  }),
  { appStateSetEditing }
)(EditorPage);
