import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import Editor from './Editor';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import {
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_ANONYMOUS,
} from '../../constants/EditorConstants';
import {
  changeEntryPrivacy,
  updateEntry,
  pinEntry,
  saveEntry,
} from '../../actions/EditorActions';
import {
  PIN_ENTRY_ORDER,
} from '../../constants/OrderConstants';
import { connect } from 'react-redux';

function EditorContainer(props) {
  const {
    changeEntryPrivacy,
    pinEntry,
    saveEntry,
  } = props;

  function onPinEntry(pinOrderUrl) {
    pinEntry()
      .then((entry) => {
        window.location.href = pinOrderUrl ||
          Routes.newOrder(entry.id, PIN_ENTRY_ORDER);
        });
  }

  function onSaveEntry() {
    saveEntry()
      .then((entry) => {
        //FIXME think through better tlogEntries update logic
        browserHistory.push({
          pathname: uri(entry.entry_url).path(),
          state: { id: entry.id, refetch: true },
        });
      });
  }

  return (
    <Editor {...props}
      onChangePrivacy={changeEntryPrivacy}
      onPinEntry={onPinEntry}
      onSaveEntry={onSaveEntry}
    />
  );
}

EditorContainer.propTypes = {
  backUrl: PropTypes.string,
  canChangeType: PropTypes.bool,
  canPinEntry: PropTypes.bool.isRequired,
  changeEntryPrivacy: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryPrivacy: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pathname: PropTypes.object.isRequired,
  pinEntry: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, { entry, tlog, tlogType }) => ({
    canPinEntry: !!state.currentUser.data.features.fixup,
    entryPrivacy: entry.get('privacy'),
    isEntryForCurrentUser: tlogType !== TLOG_TYPE_ANONYMOUS &&
      tlog.get('id') === state.currentUser.data.id,
    isFetching: state.editor.get('isFetching', false),
  }),
  {
    changeEntryPrivacy,
    updateEntry,
    pinEntry,
    saveEntry,
  }
)(EditorContainer);
