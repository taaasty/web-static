import React, { Component, PropTypes } from 'react';
import EditorLayout from './Layout/Layout';
import EditorActions from './Actions/Actions';
import EditorTypeSwitcher from './TypeSwitcher/TypeSwitcher';
import EditorArea from './EditorArea';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../shared/constants/TlogEntry';

class Editor extends Component {
  renderTypeSwitcher() {
    const { canChangeType, entryType, loading, location, tlogType } = this.props;
    if (tlogType !== TLOG_ENTRY_TYPE_ANONYMOUS) {
      return (
        <EditorTypeSwitcher
          canChangeType={canChangeType}
          entryType={entryType}
          loading={loading}
          location={location}
        />
      );
    }
  }
  render() {
    const { backUrl, entry, entryPrivacy, entryType, loading, onChangePrivacy,
            onPinEntry, onSaveEntry, tlog, tlogType, togglePreview, user: { id, features } } = this.props;
    return (
      <EditorLayout backUrl={backUrl} loading={loading}>
        <EditorActions
          canPinEntry={features.fixup}
          entryPrivacy={entryPrivacy}
          loading={loading}
          onChangePrivacy={onChangePrivacy}
          onPinEntry={onPinEntry}
          onSaveEntry={onSaveEntry}
          pinOrderUrl={entry.pinOrderUrl}
          pinState={entry.pinState}
          pinnedTill={entry.pinnedTill}
          tlog={tlog}
          tlogType={tlogType}
          togglePreview={togglePreview}
          userID={id}
        />
        <EditorArea
          entry={entry}
          entryPrivacy={entryPrivacy}
          entryType={entryType}
          loading={loading}
        />
        {this.renderTypeSwitcher()}
      </EditorLayout>
    );
  }
}

Editor.propTypes = {
  backUrl: PropTypes.string,
  canChangeType: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
  entryPrivacy: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  onChangePrivacy: PropTypes.func.isRequired,
  onPinEntry: PropTypes.func.isRequired,
  onSaveEntry: PropTypes.func.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.string.isRequired,
  togglePreview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Editor;
