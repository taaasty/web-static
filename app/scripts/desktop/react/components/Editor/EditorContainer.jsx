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
  tlogEntriesInvalidate,
} from '../../actions/TlogEntriesActions';
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
    tlogEntriesSlug,
    tlogEntriesInvalidate,
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
        const savedEntry = response.entities.entry[response.result];
        const savedTlog = savedEntry && response.entities.tlog && (
          response.entities.tlog[savedEntry.tlog]
        );

        NoticeService.closeAll();
        if (savedEntry) {
          if (isNew) {
            if (typeof ga === 'function') {
              ga('send', 'event', 'UX',
                savedEntry.isPrivate ? 'CreateAnonymous' : 'CreatePost',
                savedEntry.type
              );
            }

            if (savedTlog && savedTlog.slug === tlogEntriesSlug) {
              tlogEntriesInvalidate(); // invalidate if tlog entries already fetched
            }
          }

          //FIXME think through better tlogEntries update logic
          browserHistory.push({
            pathname: uri(savedEntry.entryUrl).path(),
            state: { id: savedEntry.id, refetch: true },
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
  tlogEntriesInvalidate: PropTypes.func.isRequired,
  tlogEntriesSlug: PropTypes.string,
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
    tlogEntriesSlug: state.tlogEntries.slug,
  }),
  {
    changeEntryPrivacy,
    pinEntry,
    saveEntry,
    tlogEntriesInvalidate,
  }
)(EditorContainer);
