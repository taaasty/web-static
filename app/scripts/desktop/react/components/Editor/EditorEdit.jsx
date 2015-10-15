import React, { Component, PropTypes } from 'react';
import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';

class EditorEdit extends Component {
  componentWillMount() {
    const { entry, tlog, tlogType } = this.props;

    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    EditorActionCreators.init({entry, tlog, tlogType});
  }
  render() {
    const { backUrl, tlogType } = this.props;

    return (
      <EditorContainer
        backUrl={backUrl}
        canChangeType={false}
        tlogType={tlogType}
      />
    );
  }
}

EditorEdit.propTypes = {
  backUrl: PropTypes.string,
  entry: PropTypes.object.isRequired,
  tlog: PropTypes.object,
  tlogType: PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
};

export default EditorEdit;
