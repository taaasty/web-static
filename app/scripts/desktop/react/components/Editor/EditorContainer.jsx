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

import * as orderConstants from '../../constants/OrderConstants';

function _EditorContainer(props) {
  function pinEntry(pinOrderUrl) {
    EditorActionCreators.pinEntry()
      .then((entry) => {
        //PopupActions.showPinEntryPopup({ entry });
        window.location.href = pinOrderUrl || Routes.newOrder(entry.id, orderConstants.PIN_ENTRY_ORDER);
      });
  }

  function saveEntry() {
    EditorActionCreators.saveEntry()
      .then((entry) => {
        browserHistory.push({ pathname: uri(entry.entry_url).path() });
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
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
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
