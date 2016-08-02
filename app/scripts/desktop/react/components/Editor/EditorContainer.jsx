/*global ga */
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
  pinEntry,
  saveEntry,
} from '../../actions/EditorActions';
import {
  PIN_ENTRY_ORDER,
} from '../../constants/OrderConstants';
import NoticeService from '../../services/Notice';
import { connect } from 'react-redux';

function EditorContainer(props) {
  const {
    changeEntryPrivacy,
    entry,
    pinEntry,
    saveEntry,
    tlog,
  } = props;

  function onPinEntry(pinOrderUrl) {
    pinEntry(tlog.get('id'))
      .then((entry) => {
        window.location.href = pinOrderUrl ||
          Routes.newOrder(entry.id, PIN_ENTRY_ORDER);
        });
  }

  function onSaveEntry() {
    const isNew = !entry.get('id');

    saveEntry(tlog.get('id'))
      .then(({ response }) => {
        const newEntry = response.entities.entry[response.result];

        NoticeService.closeAll();
        if (newEntry) {
          if (isNew && typeof ga === 'function') {
            ga('send', 'event', 'UX',
              newEntry.isPrivate ? 'CreateAnonymous' : 'CreatePost',
              newEntry.type
            );
          }

          //FIXME think through better tlogEntries update logic
          browserHistory.push({
            pathname: uri(newEntry.entryUrl).path(),
            state: { id: newEntry.id, refetch: true },
          });
        }
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
  isSaving: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  pinEntry: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default connect(
  (state, { entry, tlog, tlogType }) => ({
    canPinEntry: !!state.currentUser.data.features.fixup,
    entryPrivacy: entry.get('privacy'),
    entryType: entry.get('type'),
    isEntryForCurrentUser: tlogType === TLOG_TYPE_ANONYMOUS ||
      tlog.get('id') === state.currentUser.data.id,
    isSaving: state.editor.get('isSaving', false),
  }),
  {
    changeEntryPrivacy,
    pinEntry,
    saveEntry,
  }
)(EditorContainer);
