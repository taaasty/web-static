import React, { Component, PropTypes } from 'react';
import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';
import {
  TLOG_TYPE_PRIVATE,
  TLOG_TYPE_PUBLIC,
  TLOG_TYPE_ANONYMOUS,
} from '../../constants/EditorConstants';

class EditorNew extends Component {
  componentWillMount() {
    const { tlog, tlogType } = this.props;

    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    EditorActionCreators.init({
      tlog, tlogType,
      entry: null,
    });
  }
  render() {
    const { backUrl, location, tlogType, togglePreview } = this.props;

    return (
      <EditorContainer
        backUrl={backUrl}
        canChangeType
        location={location}
        tlogType={tlogType}
        togglePreview={togglePreview}
      />
    );
  }
}

EditorNew.propTypes = {
  backUrl: PropTypes.string,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf([
    TLOG_TYPE_PRIVATE,
    TLOG_TYPE_PUBLIC,
    TLOG_TYPE_ANONYMOUS,
  ]).isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default EditorNew;
