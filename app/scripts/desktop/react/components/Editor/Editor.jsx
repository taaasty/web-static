import React, { PropTypes } from 'react';
import EditorLayout from './Layout';
import EditorActions from './Actions';
import EditorTypeSwitcher from './TypeSwitcher';
import EditorArea from './EditorArea';
import {
  TLOG_ENTRY_TYPE_ANONYMOUS,
} from '../../../../shared/constants/TlogEntry';

function Editor(props) {
  const {
    backUrl,
    canChangeType,
    canPinEntry,
    entry,
    entryPrivacy,
    entryType,
    isEntryForCurrentUser,
    isSaving,
    onChangePrivacy,
    onPinEntry,
    onSaveEntry,
    pathname,
    tlog,
    tlogType,
    togglePreview,
  } = props;

  return (
    <EditorLayout backUrl={backUrl} isSaving={isSaving}>
      <EditorActions
        canPinEntry={canPinEntry}
        entryPrivacy={entryPrivacy}
        isEntryForCurrentUser={isEntryForCurrentUser}
        isSaving={isSaving}
        onChangePrivacy={onChangePrivacy}
        onPinEntry={onPinEntry}
        onSaveEntry={onSaveEntry}
        pinOrderUrl={entry.get('pinOrderUrl')}
        pinState={entry.get('pinState')}
        pinnedTill={entry.get('pinnedTill')}
        tlog={tlog}
        tlogType={tlogType}
        togglePreview={togglePreview}
      />
      <EditorArea entryType={entryType} />
      {(tlogType !== TLOG_ENTRY_TYPE_ANONYMOUS) && (
        <EditorTypeSwitcher
          canChangeType={canChangeType}
          entryType={entryType}
          isSaving={isSaving}
          pathname={pathname}
        />
      )}
    </EditorLayout>
  );
}

Editor.propTypes = {
  backUrl: PropTypes.string,
  canChangeType: PropTypes.bool.isRequired,
  canPinEntry: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
  entryPrivacy: PropTypes.string.isRequired,
  entryType: PropTypes.string.isRequired,
  isEntryForCurrentUser: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onChangePrivacy: PropTypes.func.isRequired,
  onPinEntry: PropTypes.func.isRequired,
  onSaveEntry: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.string.isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default Editor;
