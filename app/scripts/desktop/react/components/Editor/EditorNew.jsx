import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';

let EditorNew = React.createClass({
  propTypes: {
    entry: React.PropTypes.object,
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    backUrl: React.PropTypes.string
  },

  componentWillMount() {
    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    EditorActionCreators.init({
      entry: this.props.entry,
      tlogType: this.props.tlogType
    });
  },

  render() {
    return (
      <EditorContainer
          tlogType={this.props.tlogType}
          backUrl={this.props.backUrl}
          canChangeType={true} />
    );
  }
});

export default EditorNew;