import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import EditorActionCreators from '../../actions/editor';
//import PopupActions from '../../actions/popup';
import EditorStore from '../../stores/EditorStore';
import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Editor from './Editor';

import * as orderConstants from '../../constants/OrderConstants';

class _EditorContainer {
  pinEntry(pinOrderUrl) {
    EditorActionCreators.pinEntry()
      .then((entry) => {
        //PopupActions.showPinEntryPopup({ entry });
        window.location.href = pinOrderUrl || Routes.ordersNew(entry.id, orderConstants.PIN_ENTRY_ORDER);
      });
  }
  saveEntry() {
    EditorActionCreators.saveEntry()
      .then((entry) => {
        window.location.href = entry.entry_url;
      });
  }
  changePrivacy(privacy) {
    EditorActionCreators.changeEntryPrivacy(privacy);
  }
  changeType(type) {
    EditorActionCreators.changeEntryType(type);
  }
  render() {
    return (
      <Editor {...this.props}
        onChangePrivacy={this.changePrivacy}
        onChangeType={this.changeType}
        onPinEntry={this.pinEntry}
        onSaveEntry={this.saveEntry}
      />
    );
  }
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
  (props) => ({
    entry: EditorStore.getEntry(),
    entryType: EditorStore.getEntryType(),
    entryPrivacy: EditorStore.getEntryPrivacy(),
    loading: EditorStore.isLoading(),
    tlog: EditorStore.getTlog(),
    user: CurrentUserStore.getUser(),
  })
);

export default EditorContainer;
