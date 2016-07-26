import React, { Component, PropTypes } from 'react';
import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';
import {
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_ANONYMOUS,
} from '../../constants/EditorConstants';

class EditorEdit extends Component {
  componentWillMount() {
    const { entry, tlog, tlogType } = this.props;

    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    EditorActionCreators.init({entry, tlog, tlogType});
  }
  render() {
    const {
      backUrl,
      location,
      tlogEntries,
      tlogEntriesInvalidate,
      tlogType,
      togglePreview,
    } = this.props;

    return (
      <EditorContainer
        backUrl={backUrl}
        canChangeType={false}
        location={location}
        tlogEntries={tlogEntries}
        tlogEntriesInvalidate={tlogEntriesInvalidate}
        tlogType={tlogType}
        togglePreview={togglePreview}
      />
    );
  }
}

EditorEdit.propTypes = {
  backUrl: PropTypes.string,
  entry: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntriesInvalidate: PropTypes.func.isRequired,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default EditorEdit;
