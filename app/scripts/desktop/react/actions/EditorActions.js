export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';

export function editorSetEntry(entry) {
  return {
    type: EDITOR_SET_ENTRY,
    payload: entry,
  };
}

export function editorResetEntry() {
  return editorSetEntry(null);
}

export function editorSetPreview(flag) {
  return {
    type: EDITOR_SET_PREVIEW,
    payload: flag,
  };
}

export function editorTogglePreview() {
  return (dispatch, getState) => {
    return dispatch(editorSetPreview(!getState().editor.preview));
  };
}
