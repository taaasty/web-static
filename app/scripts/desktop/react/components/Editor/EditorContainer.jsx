import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import EditorActionCreators from '../../actions/editor';
//import PopupActions from '../../actions/popup';
import EditorStore from '../../stores/EditorStore';
import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Editor from './Editor';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import {
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_ANONYMOUS,
} from '../../constants/EditorConstants';

import * as orderConstants from '../../constants/OrderConstants';

function _EditorContainer(props) {
  function pinEntry(pinOrderUrl) {
    EditorActionCreators.pinEntry()
      .then((entry) => {
        window.location.href = pinOrderUrl || Routes.newOrder(entry.id, orderConstants.PIN_ENTRY_ORDER);
      });
  }

  function saveEntry() {
    const { tlogEntries, tlogEntriesInvalidate } = props;

    EditorActionCreators.saveEntry()
      .then((entry) => {
        //FIXME think through better tlogEntries update logic
        if (entry.tlog && tlogEntries.slug === entry.tlog.slug) {
          tlogEntriesInvalidate();
        }
        browserHistory.push({
          pathname: uri(entry.entry_url).path(),
          state: { id: entry.id, refetch: true },
        });
      });
  }

  function changePrivacy(privacy) {
    EditorActionCreators.changeEntryPrivacy(privacy);
  }

  return (
    <Editor {...props}
      onChangePrivacy={changePrivacy}
      onPinEntry={pinEntry}
      onSaveEntry={saveEntry}
    />
  );
}

_EditorContainer.propTypes = {
  backUrl: PropTypes.string,
  canChangeType: PropTypes.bool,
  entry: PropTypes.object.isRequired,
  entryPrivacy: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntriesInvalidate: PropTypes.func.isRequired,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const EditorContainer = connectToStores(
  _EditorContainer,
  [ EditorStore, CurrentUserStore ],
  () => ({
    entry: EditorStore.getEntry(),
    entryType: EditorStore.getEntryType(),
    entryPrivacy: EditorStore.getEntryPrivacy(),
    loading: EditorStore.isLoading(),
    tlog: EditorStore.getTlog(),
    user: CurrentUserStore.getUser(),
  })
);

export default EditorContainer;
