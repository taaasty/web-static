import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';

let EditorEdit = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object,
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    entry: React.PropTypes.object.isRequired,
    backUrl: React.PropTypes.string
  },

  componentWillMount() {
    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    let { entry, tlog, tlogType } = this.props;
    EditorActionCreators.init({entry, tlog, tlogType});
  },

  render() {
    return (
      <EditorContainer
          tlogType={this.props.tlogType}
          backUrl={this.props.backUrl}
          canChangeType={false} />
    );
  }
});

export default EditorEdit;