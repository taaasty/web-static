import React, { PropTypes } from 'react';
import EditorContainer from './EditorContainer';
import {
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_ANONYMOUS,
} from '../../constants/EditorConstants';

function EditorEdit(props) {
  const {
    backUrl,
    pathname,
    tlog,
    tlogType,
    togglePreview,
  } = props;

  return (
    <EditorContainer
      backUrl={backUrl}
      canChangeType={false}
      pathname={pathname}
      tlog={tlog}
      tlogType={tlogType}
      togglePreview={togglePreview}
    />
  );
}

EditorEdit.propTypes = {
  backUrl: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default EditorEdit;
